import { state } from "../state";
import { Router } from "@vaadin/router";

customElements.define(
  "reported-pets-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const cs = state.getState();

      state.getReportedPets().then(() => {
        this.shadow.innerHTML = `
          <div class="main-page-container">
            <header-menu-comp></header-menu-comp>
            <div class="general-container">
              <h1 class="main-title">Mascotas reportadas</h1>
              <div class="reported-pets-container">
              ${
                cs.myReportedPets.length
                  ? cs.myReportedPets
                      .map((rp) => {
                        if (rp.found == true) {
                          return `<found-pet-card-comp id="${rp.id}" class="reported-pet-card" picURL="${rp.picURL}" name="${rp.name}" details="${rp.details}"></found-pet-card-comp>`;
                        } else {
                          return `<reported-pet-card-comp id="${rp.id}" class="reported-pet-card" picURL="${rp.picURL}" name="${rp.name}" details="${rp.details}"></reported-pet-card-comp>`;
                        }
                      })
                      .join("")
                  : Router.go("/no-reported-pets")
              }
              </div>
            </div>
          </div>
        `;

        const style = document.createElement("style");
        style.innerHTML = `
            .main-page-container {
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
              margin: 15px;
            }
            .reported-pets-container {
              display: grid;
            }
            .reported-pet-card {
              margin-top: 15px;
            }
            .reported-pet-card:last-child {
              margin-bottom: 30px;
            }
          `;

        this.shadow.appendChild(style);
      });
    }
  }
);
