class UIActionBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="action-bar">
        
        <div class="action-bar-left">
          <div class="action-bar-logo">
            <slot name="logo"></slot>
          </div>
        </div>

        <div class="action-bar-center">
          <slot></slot>
        </div>

        <div class="action-bar-right">
          <slot name="actions"></slot>
          <slot name="cta"></slot>
        </div>

      </div>
    `;
  }
}

customElements.define("ui-action-bar", UIActionBar);