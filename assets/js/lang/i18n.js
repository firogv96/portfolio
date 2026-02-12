const SUPPORTED = new Set(["es", "en"]);

export function resolveLang() {
  // 1) ?lang=es|en (para forzar desde links o pruebas)
  const url = new URL(window.location.href);
  const q = (url.searchParams.get("lang") || "").toLowerCase();
  if (SUPPORTED.has(q)) {
    localStorage.setItem("lang", q);
    document.documentElement.lang = q;
    return q;
  }

  // 2) guardado
  const saved = (localStorage.getItem("lang") || "").toLowerCase();
  if (SUPPORTED.has(saved)) {
    document.documentElement.lang = saved;
    return saved;
  }

  // 3) navegador
  const nav = (navigator.language || "en").toLowerCase();
  const lang = nav.startsWith("es") ? "es" : "en";
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  return lang;
}

export function setLang(lang) {
  if (!SUPPORTED.has(lang)) return;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  // opcional: recargar para re-render
  window.location.reload();
}