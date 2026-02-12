export const PAGE_TITLES = {
  underconstruction: {
    es: "Portafolio de Firo en Construcción",
    en: "Firo's Portfolio under construction",
  },

  // futuras páginas:
  // home: { es: "Inicio", en: "Home" },
  // projects: { es: "Proyectos", en: "Projects" },
};

export function getPageTitle(pageKey, lang) {
  const row = PAGE_TITLES[pageKey];
  if (!row) return "";
  return row[lang] || row.en || "";
}