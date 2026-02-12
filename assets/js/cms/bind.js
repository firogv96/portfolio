import { getEntryByUri } from "./resolver.js";
import { extractI18nBlock } from "./extract.js";
import { resolveLang } from "../lang/i18n.js";

console.log("[bind] script loaded");

/* Tu idioma: lo cogemos de localStorage o navegador. Ajusta si ya tienes i18n.js
function resolveLang() {
  const saved = (localStorage.getItem("lang") || "").toLowerCase();
  if (saved === "es" || saved === "en") return saved;
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("es") ? "es" : "en";
} */

function getByPath(obj, path) {
  return path.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), obj);
}

function parseGet(getValue) {
  const v = (getValue || "").trim();

  const m = v.match(/^marker:(.+)$/i);
  if (m) return { type: "marker", key: m[1].trim().toLowerCase() };

  if (v.includes(".")) return { type: "path", path: v };

  return { type: "field", field: v };
}

function computeValue(entry, spec, lang) {
  if (spec.type === "marker") {
    const out = extractI18nBlock(entry.content, spec.key, lang);
    console.log("[bind] marker", spec.key, "->", out);
    return out;
  }
  if (spec.type === "path") {
    const v = getByPath(entry, spec.path);
    return v == null ? "" : String(v);
  }
  const v = entry[spec.field];
  return v == null ? "" : String(v);
}

function applyAttrs(el, entry, lang) {
  const attrs = el.getAttribute("data-wp-attrs");
  if (!attrs) return;

  const pairs = attrs.split(",").map(s => s.trim()).filter(Boolean);

  for (const pair of pairs) {
    const [attr, expr] = pair.split(":").map(s => s.trim());
    if (!attr || !expr) continue;

    const spec = parseGet(expr);
    const value = computeValue(entry, spec, lang);

    if (attr === "style.backgroundImage") {
      el.style.backgroundImage = value ? `url("${value}")` : "";
    } else if (attr.startsWith("style.")) {
      el.style[attr.slice(6)] = value;
    } else {
      el.setAttribute(attr, value);
    }
  }
}

export async function bindWpContent(root = document) {
  const lang = resolveLang();
  const nodes = [...root.querySelectorAll("[data-wp-uri][data-wp-get]")];

  console.log("[bind] lang =", lang);

  // agrupa por uri para no pedir lo mismo 20 veces
  const byUri = new Map();
  for (const el of nodes) {
    const uri = el.getAttribute("data-wp-uri");
    if (!byUri.has(uri)) byUri.set(uri, []);
    byUri.get(uri).push(el);
  }

  for (const [uri, elements] of byUri.entries()) {
    const entry = await getEntryByUri(uri);
    if (!entry) {
      for (const el of elements) el.textContent = "";
      continue;
    }

    for (const el of elements) {
      applyAttrs(el, entry, lang);

      const spec = parseGet(el.getAttribute("data-wp-get"));
      const value = computeValue(entry, spec, lang);

      const asHtml = el.getAttribute("data-wp-html") === "1";
      const attr = el.getAttribute("data-wp-attr");

      if (attr) {
        if (attr === "style.backgroundImage") el.style.backgroundImage = value ? `url("${value}")` : "";
        else el.setAttribute(attr, value);
      } else {
        if (asHtml) el.innerHTML = value;
        else el.textContent = value;
      }
    }
  }
}