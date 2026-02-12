const GRAPHQL_ENDPOINT = "https://cms.firodsg.com/graphql";

// cache en memoria (por sesión)
const mem = new Map();

// cache persistente (para recargas)
const LS_PREFIX = "gqlcache:";
const TTL_MS = 1000 * 60 * 10; // 10 min (ajústalo)

function now() { return Date.now(); }

function getLS(key) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + key);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj?.t || !obj?.data) return null;
    if (now() - obj.t > TTL_MS) return null;
    return obj.data;
  } catch { return null; }
}

function setLS(key, data) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify({ t: now(), data }));
  } catch {}
}

export async function gql(query, variables = {}, opts = {}) {
  const key = opts.cacheKey || JSON.stringify({ query, variables });

  // 1) memoria
  if (mem.has(key)) return mem.get(key);

  // 2) localStorage (pinta rápido)
  const lsHit = getLS(key);
  if (lsHit) {
    // devuelve rápido y actualiza en background
    mem.set(key, lsHit);
    fetchAndUpdate(query, variables, key).catch(() => {});
    return lsHit;
  }

  // 3) red normal
  const fresh = await fetchJson(query, variables);
  mem.set(key, fresh);
  setLS(key, fresh);
  return fresh;
}

async function fetchAndUpdate(query, variables, key) {
  const fresh = await fetchJson(query, variables);
  mem.set(key, fresh);
  setLS(key, fresh);
}

async function fetchJson(query, variables) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map(e => e.message).join(" | "));
  }
  return json.data;
}