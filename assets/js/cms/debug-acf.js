import { gql } from "./client.js";

const Q = `
  query {
    __type(name: "Post") {
      fields { name }
    }
  }
`;

const data = await gql(Q);
console.log("[acf fields on Post]", data?.__type?.fields?.map(f => f.name));