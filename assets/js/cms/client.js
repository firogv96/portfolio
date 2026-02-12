const GRAPHQL_ENDPOINT = "https://cms.firodsg.com/graphql";

/**
 * Ejecuta una query GraphQL.
 * - Maneja errors de GraphQL.
 * - Devuelve data.
 */
export async function gql(query, variables = {}) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors?.length) {
    const msg = json.errors.map(e => e.message).join(" | ");
    throw new Error(msg);
  }

  return json.data;
}