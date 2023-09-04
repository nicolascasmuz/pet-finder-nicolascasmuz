import { state, emptyData } from "../state";
const petFinderLogo2 = require("url:../resources/pet-finder-logo.png");
const burgerMenuImg = require("url:../resources/burger-menu.png");

customElements.define(
  "header-menu-comp",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
      this.connectedCallback();
    }
    connectedCallback() {
      const logOutEl = this.shadow.querySelector(
        ".header__option-log-out"
      ) as HTMLElement;

      logOutEl.addEventListener("click", (e) => {
        state.setState(emptyData);
      });
    }
    render() {
      const cs = state.getState();

      const header = document.createElement("header");
      header.classList.add("header");

      header.innerHTML = `
        <img class="header__logo" src="${petFinderLogo2}" alt="pet-finder-logo">
        <input class="header__menu-input" type="checkbox" id="check" />
        <label for="check" class="header__menu-label">
          <div class="header__pp-burger-container">
            <img
              class="header__profile-pic-menu"
              src="${cs.picURL}"
              alt="profile-pic-menu"
            />
            <img
              class="header__menu-img"
              src="${burgerMenuImg}"
              alt="menu-icon"
            />
          </div>
        </label>
        <ul class="header__menu-lista">
          <li>
            <a href="/home" class="header__option">Inicio</a>
            <a href="/my-data" class="header__option">Mis datos</a>
            <a href="/reported-pets" class="header__option">Mascotas reportadas</a>
            <a href="/new-report" class="header__option">Reportar mascota</a>
            <a href="/map" class="header__option">Mapa</a>
            <a href="/main" class="header__option-log-out">Cerrar sesión</a>
          </li>
        </ul>
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
          position: sticky;
          z-index: 20;
        }
        .header__logo {
          height: 40px;
          margin-left: 15px;
        }
        .header__menu-label {
          cursor: pointer;
        }
        .header__pp-burger-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .header__profile-pic-menu {
          height: 30px;
          border-radius: 4px;
        }
        .header__menu-img {
          height: 25px;
          filter: invert(95%);
          margin-right: 15px;
        }
        .header__menu-lista {
          position: fixed;
          width: 100%;
          height: 0vh;
          top: 50px;
          background-color: #26302e;
          opacity: 95%;
          text-align: center;
          transition: all 0.5s;
          padding: 0;
        }
        .header__menu-lista li {
          list-style: none;
          display: none;
          line-height: 30px;
          margin: 50px 0;
          transition: all 0.5s;
        }
        .header__menu-lista li a {
          color: #fafafa;
        }
        #check {
          display: none;
        }
        #check:checked ~ .header__menu-lista {
          height: 100vh;
        }
        #check:checked ~ .header__menu-lista li {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
        .header__option, .header__option-log-out {
          color: #fafafa;
          text-decoration: none;
          font-family: Poppins Medium;
          font-size: 24px;
          font-weight: 500;
        }
        `;

      this.shadow.appendChild(header);
      this.shadow.appendChild(style);
    }
  }
);
