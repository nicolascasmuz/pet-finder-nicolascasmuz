import { Router } from "@vaadin/router";
import { state } from "../state";
const pinMap = require("url:../resources/pin-map.png");

customElements.define(
  "home-page",
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
        ".button-01"
      ) as HTMLElement;
      const buttonMyReportsEl = this.shadow.querySelector(
        ".button-02"
      ) as HTMLElement;
      const buttonReportEl = this.shadow.querySelector(
        ".button-03"
      ) as HTMLElement;
      const mapContainerEl = this.shadow.querySelector(
        ".map-container"
      ) as HTMLElement;

      buttonDataEl.addEventListener("click", (e) => {
        Router.go("/my-data");
      });
      buttonMyReportsEl.addEventListener("click", (e) => {
        Router.go("/reported-pets");
      });
      buttonReportEl.addEventListener("click", (e) => {
        Router.go("/new-report");
      });
      mapContainerEl.addEventListener("click", (e) => {
        Router.go("/map");
      });
    }
    render() {
      const cs = state.getState();

      this.shadow.innerHTML = `
        <div class="main-page-container">
          <header-menu-comp></header-menu-comp>
          <div class="general-container">
            <h1 class="main-title">Bienvenido ${cs.nickname}</h1>
            <button-comp class="button-01" color="#ff7f87">Mis datos</button-comp>
            <button-comp class="button-02" color="#ff7f87">Mascotas reportadas</button-comp>
            <button-comp class="button-03" color="#ff7f87">Reportar mascota</button-comp>
            <div class="map-container">
              <img class="small-map" alt="" src="https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${cs.lng},${cs.lat},14,0.00,0.00/310x190@2x?access_token=pk.eyJ1Ijoibmljb2xhc2Nhc211eiIsImEiOiJjbGlmYjFjZTQwbXk3M2Zwa3VrdGtha2g1In0.HuBxvL_9t1URB93rFefxfg" >
              <img class="pin-map" src="${pinMap}" alt="test-map">
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
            text-align: left;
            line-height: 40px;
            margin: 40px 15px;
          }
          .button-02 {
            margin-top: 10px;
          }
          .button-03 {
            margin-top: 10px;
          }
          .map-container {
            position: relative;
            margin-top: 25px;
          }
          .map-container .pin-map {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .small-map {
            width: 310px;
            height: 190px;
            box-shadow: 3px 3px 3px #b2bec3;
          }
          .pin-map {
            height: 100px;
          }
        `;

      this.shadow.appendChild(style);
    }
  }
);
