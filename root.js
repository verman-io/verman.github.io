function init() {
    const form = document.getElementById("installer-form");
    if (!form) return;

    let submitBtn = document.getElementById("deploy-btn");
    let isDynamicLoad = false;
    
    if (!submitBtn) {
        const submitBtnContainer = document.createElement("div");
        submitBtnContainer.className = "flex";
        submitBtnContainer.style.marginTop = "15px";
        
        submitBtn = document.createElement("button");
        submitBtn.className = "tui-button orange-168 white-text";
        submitBtn.textContent = "Deploy / Download";
        submitBtn.id = "deploy-btn";
        submitBtnContainer.appendChild(submitBtn);

        form.appendChild(submitBtnContainer);
    } else {
        isDynamicLoad = submitBtn.hasAttribute("onclick");
        submitBtn.removeAttribute("onclick");
        submitBtn.textContent = "Deploy / Download";
    }

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const payload = {
            export_format: formData.get("export_format"),
            target_location: formData.get("target_location"),
            toolchains: [],
            databases: [],
            servers: []
        };

        const groups = {};
        for (let [key, value] of formData.entries()) {
            if (key === "export_format" || key === "target_location") continue;
            
            // Extract original group name robustly
            let actualName = key;
            if (key.includes("_version")) actualName = key.split("_version")[0];
            else if (key.includes("_env")) actualName = key.split("_env")[0];
            else if (key.includes("_var_")) actualName = key.split("_var_")[0];

            if (!groups[actualName]) {
                groups[actualName] = { name: actualName, vars: {} };
            }

            if (key.endsWith("_version")) {
                groups[actualName].version = value;
            } else if (key.endsWith("_env")) {
                groups[actualName].env = value;
            } else if (key.includes("_var_")) {
                const varName = key.split("_var_")[1];
                groups[actualName].vars[varName] = value;
            }
        }

        payload.groups = groups;
        console.log("Compiled Payload:", {
             export_format: payload.export_format,
             target_location: payload.target_location,
             groups: payload.groups
        });

        if (payload.target_location === "download") {
            
            const isOffline = document.querySelector('input[name="offline_mode"]')?.checked;
            payload.offline = isOffline;
            if (payload.export_format === ".exe") {

                Toastify({
                    text: "Building Windows Installer (.exe) via WASM Makensis...",
                    className: "info",
                    style: { background: "#0000a8" }
                }).showToast();

                generateExe(payload).catch(err => {
                    console.error("WASM Makensis error:", err);
                    Toastify({ text: "Error generating EXE: " + err, style: { background: "#a80000" } }).showToast();
                });
            } else if (payload.export_format === "innosetup") {
                Toastify({
                    text: "Generating InnoSetup script (.iss)...",
                    className: "info",
                    style: { background: "#0000a8" }
                }).showToast();

                generateInnoSetup(payload).catch(err => {
                    console.error("InnoSetup generation error:", err);
                    Toastify({ text: "Error generating InnoSetup: " + err, style: { background: "#a80000" } }).showToast();
                });
            } else {
                Toastify({
                    text: "Building archive via WASM Busybox for format: " + payload.export_format,
                    className: "info",
                    style: { background: "#0000a8" }
                }).showToast();

                generateArchive(payload).catch(err => {
                    console.error("WASM Busybox generation error:", err);
                    Toastify({ text: "Error generating archive: " + err, style: { background: "#a80000" } }).showToast();
                });
            }
        } else if (payload.target_location === "cloud") {
            // Simulated deployment
            Toastify({
                text: "Deploying to Cloud. Check /multicloud.html for settings.",
                className: "info",
                style: { background: "#008a00" }
            }).showToast();
            window.location.href = "multicloud.html";
        }
    });

    if (isDynamicLoad) {
        submitBtn.click();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

async function generateArchive(payload) {
    try {
        const moduleObj = await import('../assets/busybox.mjs');
        const BusyboxModule = moduleObj.default;
        
        let output = '';
        let errorOutput = '';

        const module = await BusyboxModule({
            noInitialRun: true,
            print: (text) => { output += text + '\n'; console.log(text); },
            printErr: (text) => { errorOutput += text + '\n'; console.error(text); },
        });

        let scriptContent = `#!/bin/sh\n# Generated by VerMan WASM\n`;
        scriptContent += `echo "Target export format: ${payload.export_format}"\n`;
        
        if (payload.groups) {
            for (const [name, data] of Object.entries(payload.groups)) {
                if (data.version && data.version.trim() !== "") {
                    const envVar = data.env || `${name.toUpperCase()}_VERSION`;
                    scriptContent += `export ${envVar}="${data.version}"\n`;
                    scriptContent += `echo "Configured ${name} version ${data.version}"\n`;
                }
            }
        }
        scriptContent += `echo "Deployment script complete."\n`;

        const dockerfileContent = `FROM busybox:latest\nCOPY . /app\nCMD ["sh", "/app/install.sh"]\n`;
        const composeContent = `version: '3'\nservices:\n  app:\n    build: .\n`;

        const filesToPreview = {
            "install.sh": scriptContent,
            "Dockerfile": dockerfileContent,
            "docker-compose.yml": composeContent
        };

        showPreviewModal(filesToPreview, () => {
            module.FS.mkdir('/work');
            module.FS.mkdir('/out');
            module.FS.writeFile('/work/install.sh', scriptContent);
            module.FS.writeFile('/work/Dockerfile', dockerfileContent);
            module.FS.writeFile('/work/docker-compose.yml', composeContent);
            
            let outName = "release";
            let cmd = "";
            
            if (payload.export_format === "Dockerfile") {
                outName = "Dockerfile";
                cmd = `cp /work/Dockerfile /out/Dockerfile`;
            } else if (payload.export_format === ".deb") {
                outName = "release.deb";
                cmd = `echo "2.0" > /work/debian-binary && ` +
                      `cd /work && ` +
                      `tar -czf control.tar.gz install.sh && ` +
                      `tar -czf data.tar.gz Dockerfile && ` +
                      `ar rc /out/${outName} /work/debian-binary control.tar.gz data.tar.gz`;
            } else if (payload.export_format === ".rpm") {
                outName = "release.rpm";
                cmd = `cd /work && tar -czf /out/${outName} .`; // mock rpm as tarball
            } else {
                // .msi, .exe, docker-compose
                outName = `release${payload.export_format === 'docker-compose' ? '.tar.gz' : (payload.export_format + '.tar.gz')}`;
                cmd = `cd /work && tar -czf /out/${outName} .`;
            }
            
            module.FS.writeFile('/run_build.sh', cmd);
            
            console.log("Running WASM busybox with command:", cmd);
            try {
                module.callMain(['sh', '/run_build.sh']);
            } catch(err) {
                // callMain may throw if it calls exit()
                console.warn("Busybox exited:", err);
            }
            
            let outData;
            try {
                outData = module.FS.readFile(`/out/${outName}`);
            } catch(e) {
                console.error("Failed to read output file from WASM FS.", e, errorOutput);
                Toastify({ text: "Archive generation failed. Check console.", style: { background: "#a80000" } }).showToast();
                return;
            }

            // Trigger download
            const blob = new Blob([outData], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = outName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            Toastify({ text: "Downloaded " + outName, style: { background: "#008a00" } }).showToast();
        });
    } catch(err) {
        console.error("WASM generation error:", err);
        Toastify({ text: "Error generating archive: " + err, style: { background: "#a80000" } }).showToast();
    }
}

async function generateExe(payload) {
    try {
        const moduleObj = await import('../assets/nsis/makensis.js');
        const MakensisModule = moduleObj.default;
        
        let output = '';
        let errorOutput = '';

        const nsisModule = await MakensisModule({
            noInitialRun: true,
            locateFile: (path) => '../assets/nsis/' + path,
            print: (text) => { output += text + '\n'; console.log(text); },
            printErr: (text) => { errorOutput += text + '\n'; console.error(text); },
        });

        // Ensure NSIS output path works properly
        nsisModule.FS.mkdir('/work');
        
        let nsisScript = `
OutFile "/work/release.exe"
Name "VerMan Installer"
RequestExecutionLevel user

Section "Install"
  SetOutPath "$INSTDIR"
`;
        if (payload.groups) {
            for (const [name, data] of Object.entries(payload.groups)) {
                if (data.version && data.version.trim() !== "") {
                    nsisScript += `  DetailPrint "Configuring ${name} ${data.version}..."\n`;
                    if (payload.offline) {
                        nsisScript += `  File /r "/work/libscript\\*.*"\n`;
                        nsisScript += `  ExecWait '"cmd.exe" /c libscript.cmd install ${name} ${data.version} --offline'\n`;
                    } else {
                        nsisScript += `  ExecWait '"cmd.exe" /c libscript.cmd install ${name} ${data.version}'\n`;
                    }
                }
            }
        }

        nsisScript += `SectionEnd\n`;
        
        const filesToPreview = {
            "install.nsi": nsisScript
        };

        showPreviewModal(filesToPreview, () => {
            nsisModule.FS.writeFile('/work/install.nsi', nsisScript);
            
            console.log("Running WASM makensis");
            try {
                nsisModule.callMain(['/work/install.nsi']);
            } catch(err) {
                console.warn("Makensis finished:", err);
            }
            
            let outData;
            try {
                outData = nsisModule.FS.readFile('/work/release.exe');
            } catch(e) {
                console.error("Failed to read output file from WASM FS.", e, errorOutput);
                Toastify({ text: "EXE generation failed. Check console.", style: { background: "#a80000" } }).showToast();
                return;
            }

            // Trigger download
            const blob = new Blob([outData], { type: "application/vnd.microsoft.portable-executable" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "release.exe";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            Toastify({ text: "Downloaded release.exe", style: { background: "#008a00" } }).showToast();
        });
    } catch(err) {
        console.error("WASM Makensis generation error:", err);
        Toastify({ text: "Error generating EXE: " + err, style: { background: "#a80000" } }).showToast();
    }
}

async function generateInnoSetup(payload) {
    try {
        let isScript = `[Setup]
AppName=VerMan Installer
AppVersion=1.0.0
AppPublisher=VerMan
DefaultDirName={autopf}\\\VerMan
PrivilegesRequired=admin
OutputDir=.
OutputBaseFilename=release

`;
        if (payload.offline) {
            isScript += `[Files]\nSource: "*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs\n\n`;
        }

        isScript += `[Run]\n`;

        if (payload.groups) {
            for (const [name, data] of Object.entries(payload.groups)) {
                if (data.version && data.version.trim() !== "") {
                    let cmd = payload.offline ? 
                        `Filename: "cmd.exe"; Parameters: "/c libscript.cmd install ${name} ${data.version} --offline"; Flags: runhidden` : 
                        `Filename: "cmd.exe"; Parameters: "/c libscript.cmd install ${name} ${data.version}"; Flags: runhidden`;
                    isScript += `${cmd}\n`;
                }
            }
        }

        const filesToPreview = {
            "install.iss": isScript
        };

        showPreviewModal(filesToPreview, () => {
            const blob = new Blob([isScript], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "install.iss";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            Toastify({ text: "Downloaded install.iss", style: { background: "#008a00" } }).showToast();
        });
    } catch(err) {
        console.error("InnoSetup generation error:", err);
        Toastify({ text: "Error generating InnoSetup: " + err, style: { background: "#a80000" } }).showToast();
    }
}
function showPreviewModal(files, downloadCallback) {
    let modal = document.getElementById("preview-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "preview-modal";
        modal.className = "tui-window absolute";
        modal.style.cssText = "display: flex; z-index: 1000; top: 10%; left: 10%; width: 80%; height: 80%; flex-direction: column; position: fixed;";
        modal.innerHTML = `
            <fieldset class="tui-fieldset" style="height: 100%; display: flex; flex-direction: column; margin: 0; padding: 10px; box-sizing: border-box;">
                <legend>Preview Download</legend>
                <div style="display: flex; flex: 1; min-height: 0; margin-bottom: 10px;">
                    <div class="tui-panel white-168" style="width: 200px; overflow-y: auto; border-right: 2px solid #000; padding: 5px; box-sizing: border-box;">
                        <ul id="preview-file-tree" style="list-style: none; padding: 0; margin: 0;"></ul>
                    </div>
                    <div class="tui-panel white-168" style="flex: 1; overflow-y: auto; padding: 10px; background: #000; color: #fff; box-sizing: border-box;">
                        <pre id="preview-file-content" style="white-space: pre-wrap; margin: 0; font-family: monospace;"></pre>
                    </div>
                </div>
                <div style="display: flex; justify-content: flex-end; align-items: center;">
                    <button type="button" id="preview-cancel-btn" class="tui-button">Cancel</button>
                    <button type="button" id="preview-download-btn" class="tui-button orange-168 white-text" style="margin-left: 10px;">Download</button>
                </div>
            </fieldset>
        `;
        document.body.appendChild(modal);
    } else {
        modal.style.display = 'flex';
    }

    const tree = document.getElementById("preview-file-tree");
    const content = document.getElementById("preview-file-content");
    const cancelBtn = document.getElementById("preview-cancel-btn");
    const downloadBtn = document.getElementById("preview-download-btn");

    tree.innerHTML = "";
    content.textContent = "Select a file to view its contents.";

    let firstFile = true;
    for (const [filename, filecontent] of Object.entries(files)) {
        const li = document.createElement("li");
        li.style.cursor = "pointer";
        li.style.padding = "4px";
        li.textContent = filename;
        li.className = "tui-button white-168";
        li.style.display = "block";
        li.style.textAlign = "left";
        li.style.marginBottom = "2px";
        li.style.border = "none";
        
        li.addEventListener("click", () => {
            Array.from(tree.children).forEach(child => {
                child.style.backgroundColor = "";
                child.style.color = "";
            });
            li.style.backgroundColor = "#0000a8";
            li.style.color = "#fff";
            content.textContent = filecontent;
        });
        tree.appendChild(li);

        if (firstFile) {
            li.click();
            firstFile = false;
        }
    }

    const close = () => {
        modal.style.display = "none";
        cancelBtn.onclick = null;
        downloadBtn.onclick = null;
    };

    cancelBtn.onclick = close;
    downloadBtn.onclick = () => {
        close();
        downloadCallback();
    };
}
