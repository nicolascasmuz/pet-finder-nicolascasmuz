const petFinderLogo1 = require("url:../resources/pet-finder-logo.png");

customElements.define(
  "header-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const header = document.createElement("header");
      header.classList.add("header");

      header.innerHTML = `
        <img class="header__logo" src="${petFinderLogo1}" alt="pet-finder-logo">
      `;

      const style = document.createElement("style");
      style.innerHTML = `
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #26302e;
          min-width: 200px;
          height: 60px;
          border-radius: 0 0 10px 10px;
        }
        .header__logo {
          height: 40px;
          margin-left: 15px;
        }
        `;

      this.shadow.appendChild(header);
      this.shadow.appendChild(style);
    }
  }
);
