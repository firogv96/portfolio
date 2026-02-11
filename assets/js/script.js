async function loadProjects() {
  const res = await fetch("https://cms.firodsg.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          posts(first: 5) {
            nodes {
              title
              excerpt
              slug
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      `
    })
  });

  const json = await res.json();
  const posts = json.data.posts.nodes;

  const container = document.getElementById("projects");
  posts.forEach(post => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h2>${post.title}</h2>
      <div>${post.excerpt}</div>
      ${post.featuredImage ? `<img src="${post.featuredImage.node.sourceUrl}" alt="${post.title}">` : ""}
    `;
    container.appendChild(card);
  });
}

loadProjects();