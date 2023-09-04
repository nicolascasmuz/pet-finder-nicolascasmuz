customElements.define(
  "map-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      this.shadow.innerHTML = `
        <div class="map-page-container">
          <header-menu-comp></header-menu-comp>
          <div class="general-container">
            <map-comp></map-comp>
          </div>
        </div>
      `;

      const style = document.createElement("style");
      style.innerHTML = `
          .page-container {
            min-height: 100vh;
            background: linear-gradient(#fafafa 50%, #8896e090);
          }
          .general-container {
            display: grid;
            justify-items: center;
          }
        `;

      this.shadow.appendChild(style);
    }
  }
);
