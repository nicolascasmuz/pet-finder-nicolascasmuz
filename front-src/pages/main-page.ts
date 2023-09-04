import { Router } from "@vaadin/router";
const picture01 = require("url:../resources/picture-01.jpg");

customElements.define(
  "main-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
      this.connectedCallback();
    }
    connectedCallback() {
      this.render();

      const buttonLogInEl = this.shadow.querySelector(
        ".button-ingresar"
      ) as HTMLElement;
      const buttonSignInEl = this.shadow.querySelector(
        ".button-registrarse"
      ) as HTMLElement;

      buttonLogInEl.addEventListener("click", (e) => {
        Router.go("/log-in");
      });
      buttonSignInEl.addEventListener("click", (e) => {
        Router.go("/sign-up");
      });
    }
    render() {
      this.shadow.innerHTML = `
        <div class="main-page-container">
          <header-comp></header-comp>
          <div class="general-container">
            <img class="main-page-picture" src="${picture01}" alt="main-page-picture" >
            <h1 class="app-name">Pet Finder</h1>
            <p class="paragraph">
              Encontrá y reportá mascotas perdidas cerca de tu ubicación
            </p>
            <button-comp class="button-ingresar" color="#ff7f87">Ingresar</button-comp>
            <button-comp class="button-registrarse" color="#8896e0">Registrarse</button-comp>
          </div>
        </div>
      `;

      const style = document.createElement("style");
      style.innerHTML = `
          .main-page-container {
            height: 100vh;
            background: linear-gradient(#fafafa 50%, #8896e090);
          }
          .general-container {
            display: grid;
            justify-items: center;
            padding: 0 15px;
          }
          .main-page-picture {
            height: 200px;
            margin-top: 25px;
          }
          .app-name {
            font-family: Poppins Semi Bold;
            font-size: 35px;
            color: #ff4654;
            text-align: center;
            margin: 15px;
          }
          .paragraph {
            font-family: Poppins Light;
            font-size: 25px;
            color: #141414;
            text-align: center;
            margin: 0;
          }
          .button-ingresar {
            margin-top: 25px;
          }
          .button-registrarse {
            margin-top: 10px;
          }
        `;

      this.shadow.appendChild(style);
    }
  }
);
