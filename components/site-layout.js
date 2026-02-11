class SiteLayout extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute("active") || "";

    this.innerHTML = `
      <site-header active="${active}"></site-header>

      <main class="site-main">
        <slot></slot>
      </main>

      <ui-action-bar active="${active}"></ui-action-bar>

      <site-footer></site-footer>
    `;
  }
}

customElements.define("site-layout", SiteLayout);