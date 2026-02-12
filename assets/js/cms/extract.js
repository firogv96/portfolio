function normalize(text) {
  return (text || "").replace(/\r\n/g, "\n");
}

function stripHtml(html) {
  return normalize(
    (html || "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]*>/g, "")
  );
}

export function extractAfterMarker(contentMaybeHtml, marker) {
  const text = stripHtml(contentMaybeHtml);
  const lower = text.toLowerCase();
  const m = marker.toLowerCase();

  const idx = lower.indexOf(m);
  if (idx === -1) return "";

  const start = idx + m.length;
  const rest = text.slice(start);
  const restLower = lower.slice(start);

  const nextMarkerIdx = restLower.search(/\n\s*#\S+/);
  const chunk = nextMarkerIdx === -1 ? rest : rest.slice(0, nextMarkerIdx);

  return chunk.trim();
}

export function extractI18nBlock(content, key, lang) {
  return extractAfterMarker(content, `#${key}-${lang}`);
}