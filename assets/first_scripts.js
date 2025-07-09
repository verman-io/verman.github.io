let firstRun = true;

let nicerName = (s) => {
    const last_slash = s.lastIndexOf("/");
    const base = s.substring(last_slash);
    const name = base === "/README.html" ? s.substring(0, last_slash) : s.substring(0, s.length - 5);
    return name.length > 25 ? '…' + name.substring(name.length-29): name;
};

const toggleSidebar = () => {
    const sideNav = document.querySelector('.tui-sidenav');

    if (sideNav) {
        const actualBodyStyle = document.getElementById("actual-body").style;
        if (sideNav.classList.contains('active')) {
            //sideNav.classList.remove('active');
            actualBodyStyle.marginLeft = '20px';
            actualBodyStyle.maxWidth = '100%';
        } else {
            actualBodyStyle.marginLeft = '390px';
            actualBodyStyle.maxWidth = '65%';
            if (firstRun) {
                firstRun = false;
                sideNav.classList.add('active');
            }
        }
    }
}
const urls = ["/docs/latest/TEST.html","/docs/latest/_lib/README.html","/docs/latest/_lib/_common/README.html","/docs/latest/_lib/_common/_noop/README.html","/docs/latest/_lib/_daemon/openrc/README.html","/docs/latest/_lib/_daemon/README.html","/docs/latest/_lib/_daemon/systemd/README.html","/docs/latest/_lib/_storage/README.html","/docs/latest/_lib/_storage/valkey/README.html","/docs/latest/_lib/_storage/etcd/README.html","/docs/latest/_lib/_storage/postgres/README.html","/docs/latest/_lib/_toolchain/nodejs/README.html","/docs/latest/_lib/_toolchain/python/README.html","/docs/latest/_lib/_toolchain/rust/README.html","/docs/latest/_lib/_toolchain/README.html","/docs/latest/_lib/_toolchain/cc/README.html","/docs/latest/_lib/_toolchain/wait4x/README.html","/docs/latest/_lib/_toolchain/jq/README.html","/docs/latest/_lib/_git/README.html","/docs/latest/_lib/_server/nodejs/README.html","/docs/latest/_lib/_server/python/README.html","/docs/latest/_lib/_server/rust/README.html","/docs/latest/_lib/_server/README.html","/docs/latest/_lib/_server/nginx/README.html","/docs/latest/_lib/_server/nginx/ROADMAP.html","/docs/latest/_lib/_server/kubernetes_thw/README.html","/docs/latest/_lib/_server/kubernetes_k0s/README.html","/docs/latest/_lib/DOCS.html","/docs/latest/app/README.html","/docs/latest/app/_storage/celery/README.html","/docs/latest/app/_storage/README.html","/docs/latest/app/third_party/firecrawl/README.html","/docs/latest/app/third_party/serve-actix-diesel-auth-scaffold/README.html","/docs/latest/app/third_party/README.html","/docs/latest/app/third_party/jupyterhub/README.html","/docs/latest/app/third_party/openvpn/README.html","/docs/latest/WHY.html","/docs/latest/README.html","/docs/latest/dockerfiles_ssh/README.html","/docs/latest/WINDOWS.html","/docs/latest/ROADMAP.html","/docs/latest/IDEAS.html","/docs/latest/vagrant/almalinux_9/README.html","/docs/latest/vagrant/README.html","/docs/latest/vagrant/debian12/README.html","/docs/latest/vagrant/alpine_3_21/README.html","/docs/latest/vagrant/debian12_multi/README.html","/docs/latest/vagrant/freebsd_14/README.html","/docs/latest/DEPENDENCIES.html","/docs/latest/gen/README.html","/docs/latest/DOCS_ROADMAP.html"];
