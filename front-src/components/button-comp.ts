customElements.define(
  "button-comp",
  class extends HTMLElement {
    color: string;
    constructor() {
      super();
      this.render();
    }
    render() {
      this.color = this.getAttribute("color") || "";

      this.innerHTML = `
          <button class="button">${this.textContent}</button>
        `;

      const style = document.createElement("style");
      style.innerHTML = `
          .button {
              background-color: ${this.color};
              border-radius: 8px;
              color: #fafafa;
              font-family: Poppins Medium;
              font-size: 20px;
              border: none;
              box-shadow: 2px 2px 2px #b2bec3;
              min-width: 315px;
              min-height: 50px;
              margin: 0;
          }
        `;

      this.appendChild(style);
    }
  }
);
