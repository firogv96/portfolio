(() => {
  const head = document.head;

  const addLink = (attrs) => {
    const selector = attrs.href
      ? `link[href="${attrs.href}"]`
      : attrs.rel
        ? `link[rel="${attrs.rel}"]`
        : null;

    if (selector && head.querySelector(selector)) return;

    const el = document.createElement("link");
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    head.appendChild(el);
  };

  const addScriptModule = (src) => {
    if (head.querySelector(`script[type="module"][src="${src}"]`)) return;
    const s = document.createElement("script");
    s.type = "module";
    s.src = src;
    head.appendChild(s);
  };

  // 1) CSS base
  addLink({ rel: "stylesheet", href: "/assets/css/base.css" });
  addLink({ rel: "stylesheet", href: "/assets/css/components.css" });

  // 2) Google Fonts preconnect
  addLink({ rel: "preconnect", href: "https://fonts.googleapis.com" });
  addLink({
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossorigin: "",
  });

  // 3) Google Fonts stylesheet
  addLink({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Zalando+Sans:ital,wght@0,200..900;1,200..900&display=swap",
  });

  // 4) Phosphor Icons (regular + fill)
  addLink({
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css",
  });
  addLink({
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/thin/style.css",
  });
  addLink({
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/light/style.css",
  });
  addLink({
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/bold/style.css",
  });
  addLink({
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css",
  });
  addLink({
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/duotone/style.css",
  });

  // 5) Web Components registry
  addScriptModule("/components/index.js");
  addScriptModule("/assets/js/lang/bootstrap.js");
  /* addScriptModule("/assets/js/cms/debug-acf.js"); */

  // 6) Favicons
  addLink({ rel: "icon", href: "/assets/favicons/favicon.ico" });
  addLink({
    rel: "apple-touch-icon",
    href: "/assets/favicons/apple-touch-icon.png",
    sizes: "180x180",
  });
  addLink({
    rel: "icon",
    href: "/assets/favicons/favicon-32x32.png",
    sizes: "32x32",
    type: "image/png",
  });
  addLink({
    rel: "icon",
    href: "/assets/favicons/favicon-16x16.png",
    sizes: "16x16",
    type: "image/png",
  });
  addLink({ rel: "manifest", href: "/assets/favicons/site.webmanifest" });
})();
