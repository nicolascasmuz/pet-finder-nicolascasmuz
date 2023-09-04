import { Router } from "@vaadin/router";
const emptyPic = require("../resources/picture-02.png");

customElements.define(
  "no-reported-pets-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
      this.connectecCallback();
    }
    connectecCallback() {
      this.render();

      const buttonReportEl = this.shadow.querySelector(
        ".button-report"
      ) as HTMLElement;

      buttonReportEl.addEventListener("click", async (e: any) => {
        e.preventDefault();
        Router.go("/new-report");
      });
    }
    render() {
      this.shadow.innerHTML = `
        <div class="page-container">
          <header-menu-comp></header-menu-comp>
          <div class="general-container">
            <h1 class="main-title">Mascotas reportadas</h1>
            <p class="paragraph">
              Aún no reportaste mascotas perdidas
            </p>
            <img class="no-reported-pets-picture" src="${emptyPic}" alt="empty-pic">
            <button-comp class="button-report" color="#ff7f87">Reportar mascota</button-comp>
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
            padding: 0 15px;
          }
          .main-title {
            font-family: Poppins Semi Bold;
            font-size: 35px;
            color: #141414;
            text-align: center;
            line-height: 40px;
            margin-top: 45px;
          }
          .paragraph {
            font-family: Poppins Light;
            font-size: 16px;
            color: #141414;
            text-align: center;
            margin: 0;
          }
          .no-reported-pets-picture {
            margin-top: 45px;
          }
          .button-report {
            margin-top: 55px;
          }
        `;

      this.shadow.appendChild(style);
    }
  }
);
