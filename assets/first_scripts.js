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
const urls = ["/docs/latest/ARCHITECTURE.html","/docs/latest/vagrant/README.html","/docs/latest/vagrant/debian12/README.html","/docs/latest/vagrant/almalinux_9/README.html","/docs/latest/vagrant/alpine_3_21/README.html","/docs/latest/vagrant/freebsd_14/README.html","/docs/latest/vagrant/debian12_multi/README.html","/docs/latest/DOCS_ROADMAP.html","/docs/latest/README.html","/docs/latest/netctl/README.html","/docs/latest/TEST.html","/docs/latest/WHY.html","/docs/latest/_lib/DOCS.html","/docs/latest/_lib/README.html","/docs/latest/_lib/_server/python/README.html","/docs/latest/_lib/_server/openbao/README.html","/docs/latest/_lib/_server/nginx/README.html","/docs/latest/_lib/_server/nginx/ROADMAP.html","/docs/latest/_lib/_server/README.html","/docs/latest/_lib/_server/fluentbit/README.html","/docs/latest/_lib/_server/docker/README.html","/docs/latest/_lib/_server/kubernetes_thw/README.html","/docs/latest/_lib/_server/caddy/README.html","/docs/latest/_lib/_server/nodejs/README.html","/docs/latest/_lib/_server/httpd/README.html","/docs/latest/_lib/_server/kubernetes_k0s/README.html","/docs/latest/_lib/_server/iis/README.html","/docs/latest/_lib/_server/rust/README.html","/docs/latest/_lib/_git/README.html","/docs/latest/_lib/_daemon/README.html","/docs/latest/_lib/_daemon/openrc/README.html","/docs/latest/_lib/_daemon/systemd/README.html","/docs/latest/_lib/_bootstrap/choco/README.html","/docs/latest/_lib/_bootstrap/brew/README.html","/docs/latest/_lib/_bootstrap/README.html","/docs/latest/_lib/_bootstrap/dash/README.html","/docs/latest/_lib/_bootstrap/winget/README.html","/docs/latest/_lib/_bootstrap/nix/README.html","/docs/latest/_lib/_bootstrap/pkgx/README.html","/docs/latest/_lib/_bootstrap/msys2/README.html","/docs/latest/_lib/_bootstrap/apk/README.html","/docs/latest/_lib/_bootstrap/scoop/README.html","/docs/latest/_lib/_bootstrap/busybox/README.html","/docs/latest/_lib/_bootstrap/powershell/README.html","/docs/latest/_lib/_bootstrap/7zip/README.html","/docs/latest/_lib/_bootstrap/wget/README.html","/docs/latest/_lib/_bootstrap/curl/README.html","/docs/latest/_lib/_storage/rabbitmq/README.html","/docs/latest/_lib/_storage/sqlite/README.html","/docs/latest/_lib/_storage/README.html","/docs/latest/_lib/_storage/postgres/README.html","/docs/latest/_lib/_storage/etcd/README.html","/docs/latest/_lib/_storage/mongodb/README.html","/docs/latest/_lib/_storage/mariadb/README.html","/docs/latest/_lib/_storage/valkey/README.html","/docs/latest/_lib/_toolchain/python/README.html","/docs/latest/_lib/_toolchain/java/README.html","/docs/latest/_lib/_toolchain/bun/README.html","/docs/latest/_lib/_toolchain/swift/README.html","/docs/latest/_lib/_toolchain/ruby/README.html","/docs/latest/_lib/_toolchain/cc/README.html","/docs/latest/_lib/_toolchain/php/README.html","/docs/latest/_lib/_toolchain/jq/README.html","/docs/latest/_lib/_toolchain/README.html","/docs/latest/_lib/_toolchain/deno/README.html","/docs/latest/_lib/_toolchain/cpp/README.html","/docs/latest/_lib/_toolchain/kotlin/README.html","/docs/latest/_lib/_toolchain/go/README.html","/docs/latest/_lib/_toolchain/nodejs/README.html","/docs/latest/_lib/_toolchain/sh/README.html","/docs/latest/_lib/_toolchain/c/README.html","/docs/latest/_lib/_toolchain/zig/README.html","/docs/latest/_lib/_toolchain/rust/README.html","/docs/latest/_lib/_toolchain/elixir/README.html","/docs/latest/_lib/_toolchain/csharp/README.html","/docs/latest/_lib/_toolchain/wait4x/README.html","/docs/latest/_lib/_common/README.html","/docs/latest/_lib/_common/_noop/README.html","/docs/latest/DEPENDENCIES.html","/docs/latest/gen/README.html","/docs/latest/FUTURE.html","/docs/latest/app/README.html","/docs/latest/app/third_party/README.html","/docs/latest/app/third_party/openvpn/README.html","/docs/latest/app/third_party/jupyterhub/README.html","/docs/latest/app/third_party/serve-actix-diesel-auth-scaffold/README.html","/docs/latest/app/third_party/firecrawl/README.html","/docs/latest/app/third_party/wordpress/README.html","/docs/latest/app/_storage/README.html","/docs/latest/app/_storage/celery/README.html","/docs/latest/dockerfiles_ssh/README.html","/docs/latest/USAGE.html","/docs/latest/ROADMAP.html","/docs/latest/IDEAS.html","/docs/latest/WINDOWS.html","/docs/latest/DEVELOPING.html"];
