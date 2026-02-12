import { resolveLang } from "./i18n.js";
import { getPageTitle } from "./i18n-pages.js";

export function applyPageTitle(pageKey) {
  const lang = resolveLang();
  const title = getPageTitle(pageKey, lang);
  if (title) document.title = title;
  return { lang, title };
}