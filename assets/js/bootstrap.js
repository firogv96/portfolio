import { resolveLang } from "./i18n.js";

const lang = resolveLang();

// (opcional) expón una global para que sea fácil usarla sin imports en otras partes
window.APP = window.APP || {};
window.APP.lang = lang;

import { bindWpContent } from "./cms/bind.js";
console.log("[page] calling bindWpContent()");
bindWpContent();