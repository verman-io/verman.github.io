"use strict";(self.webpackChunkverman_www=self.webpackChunkverman_www||[]).push([[189],{2189:(h,r,o)=>{o.r(r),o.d(r,{SlashModule:()=>c});var l=o(177),s=o(9641),e=o(4438),a=o(206);const F=[{path:"",component:(()=>{class t{static#e=this.\u0275fac=function(n){return new(n||t)};static#t=this.\u0275cmp=e.VBU({type:t,selectors:[["app-slash"]],decls:143,vars:0,consts:[[1,"background-sky","hero"],["id","intro"],[1,"hero-logo"],[1,"homepage-container"],["aria-label","Docker killer",1,"hero-headline","no-title","no-toc","no-anchor"],[1,"cta-button-container"],[1,"cta-link",2,"display","flex","flex-direction","column","gap","12px","text-align","center"],["routerLink","doc/more",1,"button","hero-cta","no-print"],["href","https://github.com/verman-io/verman-presentations/releases/download/init/packaging-solutions.pdf","target","_blank",1,"button","hero-cta","no-print",2,"margin-left","8px","display","flex","align-items","center","justify-content","center"],[1,"home-rows"],["layout","column","layout-xs","column",1,"home-row","homepage-container"],["aria-labelledby","promo-0-title",1,"text-block"],["id","promo-0-title",1,"no-anchor"],[2,"font-weight","bold"],["layout","row","layout-xs","column",1,"home-row","homepage-container"],[1,"text-container"],["aria-labelledby","promo-1-title",1,"text-block"],["id","promo-1-title",1,"text-headline","no-anchor"],[2,"text-transform","none"],[1,"text-body"],["dir","auto"],["href","https://rvm.io","rel","nofollow"],["href","https://www.ruby-lang.org/en","rel","nofollow"],["href","https://github.com/nvm-sh/nvm"],["href","https://nodejs.org/en","rel","nofollow"],["href","https://rustup.rs","rel","nofollow"],["href","https://www.rust-lang.org","rel","nofollow"],["href","https://github.com/pyenv/pyenv"],["href","https://www.python.org","rel","nofollow"],["href","https://postgresql.org"],["href","https://mariadb.org"],["href","https://valkey.io/","target","_blank"],["href","https://kubernetes.io","target","_blank"],["href","https://docs.docker.com/compose","target","_blank"],["href","https://mesos.apache.org","target","_blank"],["aria-labelledby","promo-2-title",1,"text-block","promo-2-desc"],["id","promo-2-title",1,"text-headline","no-anchor"],["alt","Hero image","src","../../assets/images/docs/copyright-license.svg",2,"max-height","315px","width","auto"],["aria-labelledby","promo-3-title",1,"text-block","l-pad-top-2"],["id","promo-3-title",1,"text-headline","no-anchor"],[2,"text-align","center"]],template:function(n,d){1&n&&(e.j41(0,"header"),e.nrm(1,"div",0),e.j41(2,"section",1),e.nrm(3,"div",2),e.j41(4,"div",3)(5,"h1",4),e.EFF(6," The Docker killer."),e.nrm(7,"br"),e.EFF(8,"Cross-platform deploys. "),e.k0s(),e.j41(9,"div",5)(10,"p",6)(11,"a",7),e.EFF(12,"Learn more"),e.k0s(),e.j41(13,"a",8),e.EFF(14,"Whitepaper (draft) "),e.j41(15,"mat-icon"),e.EFF(16,"open_in_new"),e.k0s()()()()()()(),e.j41(17,"article")(18,"div",9)(19,"div",10)(20,"div")(21,"section",11)(22,"h2",12),e.EFF(23," Version Manager (verMan) per software is "),e.j41(24,"strong",13),e.EFF(25,"the solution"),e.k0s()()()()(),e.j41(26,"div",14)(27,"div",15)(28,"section",16)(29,"h2",17),e.EFF(30," Version Manager ("),e.j41(31,"span",18),e.EFF(32,"verMan"),e.k0s(),e.EFF(33,") "),e.k0s(),e.j41(34,"p",19),e.EFF(35,"Popular version managers\u2014from other vendors\u2014include:"),e.k0s(),e.j41(36,"ul",20)(37,"li")(38,"a",21)(39,"code"),e.EFF(40,"rvm"),e.k0s()(),e.EFF(41," for "),e.j41(42,"a",22),e.EFF(43,"Ruby"),e.k0s(),e.EFF(44,"; "),e.k0s(),e.j41(45,"li")(46,"a",23)(47,"code"),e.EFF(48,"nvm"),e.k0s()(),e.EFF(49," for "),e.j41(50,"a",24),e.EFF(51,"Node.js"),e.k0s(),e.EFF(52,"; "),e.k0s(),e.j41(53,"li")(54,"a",25)(55,"code"),e.EFF(56,"rustup"),e.k0s()(),e.EFF(57," for "),e.j41(58,"a",26),e.EFF(59,"Rust"),e.k0s(),e.EFF(60,"; "),e.k0s(),e.j41(61,"li")(62,"a",27)(63,"code"),e.EFF(64,"pyenv"),e.k0s()(),e.EFF(65," for "),e.j41(66,"a",28),e.EFF(67,"Python"),e.k0s(),e.EFF(68,". "),e.k0s()(),e.j41(69,"p",19),e.EFF(70,"Taking this to its logical extreme, let's create version managers for:"),e.k0s(),e.j41(71,"ul",20)(72,"li"),e.EFF(73,"Databases"),e.k0s(),e.j41(74,"ul")(75,"li")(76,"a",29),e.EFF(77,"PostgreSQL"),e.k0s()(),e.j41(78,"ul")(79,"li"),e.EFF(80,"Extensions"),e.k0s()(),e.j41(81,"li")(82,"a",30),e.EFF(83,"MariaDB"),e.k0s()(),e.j41(84,"li")(85,"del"),e.EFF(86,"Redis"),e.k0s(),e.j41(87,"a",31),e.EFF(88,"Valkey"),e.k0s()()(),e.j41(89,"li"),e.EFF(90,"Application servers"),e.k0s(),e.j41(91,"li"),e.EFF(92,"Reverse proxies and HTTP servers"),e.k0s(),e.j41(93,"li"),e.EFF(94,"Cluster management solutions"),e.k0s(),e.j41(95,"ul")(96,"li")(97,"a",32),e.EFF(98,"Kubernetes"),e.k0s()(),e.j41(99,"li")(100,"a",33),e.EFF(101,"Docker Compose"),e.k0s()(),e.j41(102,"li")(103,"a",34),e.EFF(104,"Apache Mesos"),e.k0s()()(),e.j41(105,"li"),e.EFF(106,"\u2026"),e.k0s()()()(),e.j41(107,"div",15)(108,"section",35)(109,"h2",36),e.EFF(110,"Open licensed"),e.k0s(),e.nrm(111,"img",37),e.j41(112,"p",19),e.EFF(113,"Don't trust us; trust the code. We license without usage restrictions. (Apache-2.0 OR MIT) "),e.k0s()()(),e.j41(114,"div",15)(115,"section",38)(116,"h2",39),e.EFF(117,"Cross-platform"),e.k0s(),e.j41(118,"ul")(119,"li"),e.EFF(120,"Windows (not just WSL | WSL2)"),e.k0s(),e.j41(121,"li"),e.EFF(122,"macOS"),e.k0s(),e.j41(123,"li"),e.EFF(124,"Linux"),e.k0s(),e.j41(125,"li"),e.EFF(126,"iOS"),e.k0s(),e.j41(127,"li"),e.EFF(128,"Android"),e.k0s(),e.j41(129,"li"),e.EFF(130,"SunOS (Solaris \u2192 OpenSolaris \u2192 illumos)"),e.k0s(),e.j41(131,"li"),e.EFF(132,"Mainframes"),e.k0s(),e.j41(133,"li"),e.EFF(134,"Supercomputers"),e.k0s()(),e.j41(135,"p",19),e.EFF(136,"Actually cross-platform. Unlike Docker on Windows and macOS, this is "),e.j41(137,"strong"),e.EFF(138,"actually native"),e.k0s(),e.EFF(139,"."),e.k0s()()()(),e.j41(140,"p",40)(141,"a",7),e.EFF(142,"Learn more"),e.k0s()()()())},dependencies:[s.Wk,a.An],styles:["#promo-0-title[_ngcontent-%COMP%]{font-size:32px;font-style:italic;font-weight:400}div.text-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#1976d2}div.text-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}"]})}return t})()}];let c=(()=>{class t{static#e=this.\u0275fac=function(n){return new(n||t)};static#t=this.\u0275mod=e.$C({type:t});static#o=this.\u0275inj=e.G2t({imports:[l.MD,s.iI,s.iI.forChild(F),a.An]})}return t})()}}]);