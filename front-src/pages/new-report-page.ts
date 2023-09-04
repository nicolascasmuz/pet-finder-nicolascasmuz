import { state } from "../state";
import { Router } from "@vaadin/router";
import { Dropzone } from "dropzone";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.BACKEND_URL;
const uploadPic = require("../resources/upload-pic.png");
const pinMap = require("url:../resources/pin-map.png");

customElements.define(
  "new-report-page",
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

      const buttonCancel = this.shadow.querySelector(
        ".button-cancel"
      ) as HTMLElement;
      buttonCancel.addEventListener("click", (e) => {
        Router.go("/home");
      });

      const formEl = this.shadow.querySelector(
        ".new-report-form"
      ) as HTMLElement;
      const addPetPicEl = this.shadow.querySelector(
        ".add-pet-pic"
      ) as HTMLElement;
      const addPetPicSrcEl = this.shadow.querySelector(
        ".add-pet-pic"
      ) as HTMLSourceElement;

      const nameInputEl = this.shadow.querySelector(
        ".name-input"
      ) as HTMLElement;
      const mapEl = this.shadow.querySelector(".map") as HTMLElement;
      const detailsInputEl = this.shadow.querySelector(
        ".details-input"
      ) as HTMLElement;
      const input1El = nameInputEl.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input2El = this.shadow.querySelector(
        ".details-input"
      ) as HTMLElement;
      const requiredField1El = nameInputEl.querySelector(
        ".required-field"
      ) as HTMLElement;
      const requiredField2El = this.shadow.querySelector(
        ".details-required-field"
      ) as HTMLElement;

      let picFile;

      let myDropzone = new Dropzone(addPetPicEl, {
        url: "/file/post",
        autoProcessQueue: false,
      });

      myDropzone.on("addedfile", (file) => {
        picFile = file;
        addPetPicSrcEl.src = file;
      });

      function initMap() {
        return new mapboxgl.Map({
          container: mapEl,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [cs.lng, cs.lat],
          zoom: 13,
        });
      }

      const mapCoordinates = initMap();

      formEl.addEventListener("submit", async (e: any) => {
        e.preventDefault();

        const nameValue = e.target["name"].value;
        const detailsValue = e.target["det"].value;

        const newData = {
          userId: cs.userId,
          picURL: "",
          name: nameValue,
          details: detailsValue,
          lng: mapCoordinates.getCenter().toArray()[0],
          lat: mapCoordinates.getCenter().toArray()[1],
          ownerEmail: cs.email,
          ownerName: cs.nickname,
        };

        if (nameValue != "" && picFile != undefined && detailsValue != "") {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 1px #b2bec3";
          addPetPicEl.style.borderStyle = "dotted #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "none";

          if (picFile != undefined) {
            newData.picURL = picFile.dataURL;
          }

          await state.setReport(newData);
        } else if (
          nameValue == "" &&
          picFile == undefined &&
          detailsValue != ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 1px #b2bec3";
          addPetPicEl.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "none";
        } else if (
          nameValue != "" &&
          picFile == undefined &&
          detailsValue == ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 3px #EA2027";
          addPetPicEl.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "block";
        } else if (
          nameValue == "" &&
          picFile == undefined &&
          detailsValue == ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 3px #EA2027";
          addPetPicEl.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "block";
        } else if (
          nameValue != "" &&
          picFile == undefined &&
          detailsValue != ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 1px #b2bec3";
          addPetPicEl.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "none";
        } else if (
          nameValue != "" &&
          picFile != undefined &&
          detailsValue == ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 3px #EA2027";
          addPetPicEl.style.borderStyle = "dotted #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "block";
        } else if (
          nameValue == "" &&
          picFile != undefined &&
          detailsValue != ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 1px #b2bec3";
          addPetPicEl.style.borderStyle = "dotted #EA2027";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "none";
        } else if (
          nameValue != "" &&
          picFile == undefined &&
          detailsValue != ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 1px #b2bec3";
          addPetPicEl.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "none";
        } else if (
          nameValue == "" &&
          picFile != undefined &&
          detailsValue == ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 3px #EA2027";
          addPetPicEl.style.borderStyle = "dotted #EA2027";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "block";
        }
      });
    }
    render() {
      this.shadow.innerHTML = `
        <div class="main-page-container">
          <header-menu-comp></header-menu-comp>
          <div class="general-container">
            <h1 class="main-title">Reportar mascota</h1>
            <p class="paragraph-01">
              Ingresá la siguiente información para realizar el reporte de la mascota
            </p>
            <form class="new-report-form">
              <form-input-comp class="name-input" type="text" name="name">NOMBRE</form-input-comp>
              <img class="add-pet-pic" src="${uploadPic}" alt="upload-picture">
              <div class="map-container">
                <div class="map"></div>
                <img class="pin-map" src="${pinMap}" alt="test-map">
              </div>
              <p class="paragraph-02">
                Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.
              </p>
              <label class="details-label">OBSERVACIONES
                <textarea class="details-input" type="text" name="det"></textarea>
                <p class="details-required-field">Campo obligatorio</p>
              </label>
              <button-comp class="button-report" color="#ff7f87">Reportar mascota</button-comp>
              <button-comp class="button-cancel" color="#ff7f87">Cancelar</button-comp>
            </form>
          </div>
        </div>
      `;

      const style = document.createElement("style");
      style.innerHTML = `
          .main-page-container {
            height: auto;
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
          .paragraph-01 {
            font-family: Poppins Light;
            font-size: 16px;
            color: #141414;
            text-align: center;
            width: 300px;
            margin: 0;
          }
          .new-report-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-top: 40px;
          }
          .add-pet-pic {
            border-style: dotted;
            border-width: 3px;
            border-radius: 8px;
            width: 315px;
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
          .map {
            width: 310px;
            height: 190px;
          }
          .pin-map {
            height: 100px;
          }
          .mapboxgl-ctrl {
            display: none;
          }
          .paragraph-02 {
            font-family: Poppins Light;
            font-size: 16px;
            color: #141414;
            text-align: center;
            width: 320px;
            margin: 0;
          }
          .details-label {
            font-family: Poppins Extra Light;
            font-size: 20px;
            margin: 0;
          }
          .details-input {
            display: block;
            width: 315px;
            height: 150px;
            font-family: Poppins Light;
            font-size: 20px;
          }
          .details-required-field {
            display: none;
            color: #EA2027;
            font-family: Poppins Medium;
            width: 250px;
            margin: 0;
          }
          .button-report {
            margin-top: 20px;
          }
          .button-cancel {
            margin-bottom: 50px;
          }
        `;

      this.shadow.appendChild(style);
    }
  }
);
