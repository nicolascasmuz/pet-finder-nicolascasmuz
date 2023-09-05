import { Router } from "@vaadin/router";
import { state } from "../state";
import mapboxgl from "mapbox-gl";
import MapboxClient from "mapbox";
const MAPBOX_TOKEN = process.env.MAPBOX_KEY;
mapboxgl.accessToken = MAPBOX_TOKEN;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);
const getLocationImg = require("url:../resources/get-location_1@2x.png");

customElements.define(
  "location-page",
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
      const cs = state.getState();

      const locationFormEl = this.shadow.querySelector(
        ".location-form"
      ) as HTMLElement;
      const formInput1El = this.shadow.querySelector(".input1") as HTMLElement;
      const formInput2El = this.shadow.querySelector(".input2") as HTMLElement;
      const input1El = formInput1El.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input2El = formInput2El.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const requiredField1El = formInput1El.querySelector(
        ".required-field"
      ) as HTMLElement;
      const requiredField2El = formInput2El.querySelector(
        ".required-field"
      ) as HTMLElement;

      locationFormEl.addEventListener("submit", async (e: any) => {
        e.preventDefault();
        const addressValue = e.target["address"].value;
        const townValue = e.target["town"].value;

        mapboxClient.geocodeForward(
          `${addressValue} ${townValue}`,
          {
            country: "ar",
            autocomplete: true,
            language: "es",
          },
          async function locationData(err, data, res) {
            if (!err) {
              const [lng, lat] = data.features[0].geometry.coordinates;

              const address = data.features[0].place_name_es.split(",")[0];

              const location = data.features[0].place_name_es
                .split(",")[1]
                .slice(1);

              const setProfileData = {
                email: cs.email,
                password: cs.password,
                address,
                location,
                lat,
                lng,
              };

              if (addressValue != "" && townValue != "") {
                await state.setProfile(setProfileData).then(() => {
                  Router.go("/home");
                });
              } else if (addressValue != "" && townValue == "") {
                input1El.style.border = "solid 1px #b2bec3";
                input2El.style.border = "solid 3px #EA2027";
                requiredField1El.style.display = "none";
                requiredField2El.style.display = "block";
              } else if (addressValue == "" && townValue != "") {
                input1El.style.border = "solid 3px #EA2027";
                input2El.style.border = "solid 1px #b2bec3";
                requiredField1El.style.display = "block";
                requiredField2El.style.display = "none";
              } else {
                input1El.style.border = "solid 3px #EA2027";
                input2El.style.border = "solid 3px #EA2027";
                requiredField1El.style.display = "block";
                requiredField2El.style.display = "block";
              }
            }
          }
        );
      });
    }
    render() {
      this.shadow.innerHTML = `
        <div class="main-page-container">
          <header-comp></header-comp>
          <div class="general-container">
            <img class="main-page-picture" src="${getLocationImg}" alt="main-page-picture" >
            <form class="location-form">
              <form-input-comp class="input1" type="text" name="address">DIRECCIÓN</form-input-comp>
              <form-input-comp class="input2" type="text" name="town">LOCALIDAD</form-input-comp>
              <button-comp class="button-next" color="#00a884">Siguiente</button-comp>
            </form>
            <p class="paragraph-02">
              Dar mi ubicación actual <a href="" class="location-link">Clic aquí.</a>
            </p>
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
          .location-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 30px;
          }
          .paragraph-02 {
            font-family: Poppins Light;
            font-size: 16px;
            color: #141414;
            text-align: center;
            margin: 15px 0 0 0;
          }
          .location-link {
            color: #00a884;
            text-decoration: none;
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
