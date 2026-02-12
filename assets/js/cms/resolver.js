import { gql } from "./client.js";
import { QUERY_ENTRY_BY_URI } from "./queries.js";

function pickFirst(...vals) {
  for (const v of vals) if (typeof v === "string" && v.trim()) return v;
  return "";
}

export async function getEntryByUri(uri) {
  let u = (uri || "").trim();
  if (!u.startsWith("/")) u = "/" + u;
  if (!u.endsWith("/")) u = u + "/";

  const data = await gql(QUERY_ENTRY_BY_URI, { uri: u });
  const node = data?.nodeByUri;
  if (!node) return null;

  return {
    type: node.__typename,
    id: node.id,
    uri: node.uri,

    databaseId: node.databaseId ?? null,
    slug: node.slug || "",
    status: node.status || "",
    date: node.date || null,
    modified: node.modified || null,

    title: pickFirst(node.title_rendered, node.title_plain),
    content: pickFirst(node.content_rendered, node.content_plain),

    featuredImage: node.featuredImage?.node
      ? {
          url: node.featuredImage.node.sourceUrl,
          alt: node.featuredImage.node.altText || "",
          width: node.featuredImage.node.mediaDetails?.width,
          height: node.featuredImage.node.mediaDetails?.height,
        }
      : null,

    categories: node.categories?.nodes || [],
    tags: node.tags?.nodes || [],

    // ✅ ACF group normalizado bajo "acf"
    acf: node.customMeta || null,

    raw: node,
  };
}