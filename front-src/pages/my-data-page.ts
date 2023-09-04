import { Router } from "@vaadin/router";
import { state } from "../state";

customElements.define(
  "my-data-page",
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

      const buttonDataEl = this.shadow.querySelector(
        ".button-datos"
      ) as HTMLElement;
      const buttonPassEl = this.shadow.querySelector(
        ".button-contraseña"
      ) as HTMLElement;

      buttonDataEl.addEventListener("click", (e) => {
        Router.go("/edit-data");
      });
      buttonPassEl.addEventListener("click", (e) => {
        Router.go("/edit-pass");
      });
    }
    render() {
      const cs = state.getState();

      this.shadow.innerHTML = `
          <div class="main-page-container">
            <header-menu-comp></header-menu-comp>
            <div class="general-container">
              <h1 class="main-title">Mis datos</h1>
                <div class="data-container">
                    <center>
                      <img
                      class="profile-pic-field"
                      src="${cs.picURL}"
                      alt="profile-pic-field"
                      />
                    </center>
                    <p class="name-field">NICK: <span class="name-span">${cs.nickname}</span></p>
                    <p class="email-field">EMAIL: <span class="email-span">${cs.email}</span></p>
                    <p class="address-field">DIRECCIÓN: <span class="location-span">${cs.address}</span></p>
                    <p class="location-field">LOCALIDAD: <span class="location-span">${cs.location}</span></p>
                </div>
                <div class="options-container">
                    <button-comp class="button-datos" color="#ff7f87">Modificar datos</button-comp>
                    <button-comp class="button-contraseña" color="#ff7f87">Modificar contraseña</button-comp>
                </div>
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
            .main-title {
              font-family: Poppins Semi Bold;
              font-size: 35px;
              color: #141414;
              text-align: center;
              line-height: 40px;
              margin: 40px 15px 15px 15px;
            }
            .data-container {
              margin: 15px 0;
            }
            .profile-pic-field {
              height: 100px;
              border-radius: 8px;
            }
            .name-field {
              font-family: Poppins Extra Light;
              font-size: 20px;
            }
            .email-field {
              font-family: Poppins Extra Light;
              font-size: 20px;
            }
            .address-field {
              font-family: Poppins Extra Light;
              font-size: 20px;
            }
            .location-field {
              font-family: Poppins Extra Light;
              font-size: 20px;
            }
            .name-span {
              font-family: Poppins Light;
              font-size: 20px;
            }
            .email-span {
              font-family: Poppins Light;
              font-size: 20px;
            }
            .location-span {
              font-family: Poppins Light;
              font-size: 20px;
            }
            .options-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 15px;
              margin: 15px 0;
            }
          `;

      this.shadow.appendChild(style);
    }
  }
);
