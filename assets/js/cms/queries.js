export const QUERY_ENTRY_BY_URI = `
  query GetNodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      id
      uri

      ... on NodeWithTitle {
        title_plain: title
        title_rendered: title(format: RENDERED)
      }

      ... on NodeWithContentEditor {
        content_plain: content
        content_rendered: content(format: RENDERED)
      }

      ... on NodeWithFeaturedImage {
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
      }

      ... on Post {
        databaseId
        slug
        status
        date
        modified

        categories { nodes { name slug } }
        tags { nodes { name slug } }

        # ✅ ACF Group
        customMeta {
          ciudad
          colaboracion
          noRemunerado
          nombreDelColaborador
          pais
          relacionLaboral
          relevancia
          trabajoDeArchivo
        }
      }

      ... on Page {
        databaseId
        slug
        status
        date
        modified
      }
    }
  }
`;