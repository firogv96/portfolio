class UIButton extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute("variant") || "primary-text";
    const href = this.getAttribute("href");
    const type = this.getAttribute("type") || "button";
    const disabled = this.hasAttribute("disabled");

    // 1) Guardar el contenido original (texto + iconos)
    const originalNodes = Array.from(this.childNodes);

    // 2) Crear <a> o <button>
    const el = document.createElement(href ? "a" : "button");
    el.className = `btn btn-${variant}`;

    if (href) el.setAttribute("href", href);
    else el.setAttribute("type", type);

    if (disabled) el.setAttribute("disabled", "");

    // 3) Contenedor interno
    const content = document.createElement("span");
    content.className = "btn-content";

    // 4) Reinsertar lo que el usuario puso dentro de <ui-button>
    originalNodes.forEach((n) => content.appendChild(n));

    el.appendChild(content);

    // 5) Reemplazar el contenido del componente por el botón final
    this.replaceChildren(el);
  }
}

customElements.define("ui-button", UIButton);