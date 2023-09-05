import { state } from "../state";
import { Router } from "@vaadin/router";
import { Dropzone } from "dropzone";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.MAPBOX_KEY;
const pinMap = require("url:../resources/pin-map.png");

customElements.define(
  "edit-report-page",
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

      const formEl = this.shadow.querySelector(
        ".edit-report-form"
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

      const buttonFoundEl = this.shadow.querySelector(
        ".button-found"
      ) as HTMLElement;
      const foundPetCompEl = this.shadow.querySelector(
        "found-pet-comp"
      ) as HTMLElement;
      const buttonYesFPEl = foundPetCompEl.querySelector(
        ".button-yes"
      ) as HTMLElement;
      const buttonNoFPEl = foundPetCompEl.querySelector(
        ".button-no"
      ) as HTMLElement;

      const buttonDeleteEl = this.shadow.querySelector(
        ".button-delete"
      ) as HTMLElement;
      const deletedPetCompEl = this.shadow.querySelector(
        "deleted-pet-comp"
      ) as HTMLElement;
      const buttonYesDPEl = deletedPetCompEl.querySelector(
        ".button-yes"
      ) as HTMLElement;
      const buttonNoDPEl = deletedPetCompEl.querySelector(
        ".button-no"
      ) as HTMLElement;

      // SE ACCIONA EL BOTÓN FOUND
      buttonFoundEl.addEventListener("click", () => {
        foundPetCompEl.style.display = "block";
      });
      buttonYesFPEl.addEventListener("click", async () => {
        const newData = {
          id: cs.selectedPet.id,
          picURL: cs.selectedPet.picURL,
          name: cs.selectedPet.name,
          details: cs.selectedPet.details,
          found: true,
          lng: cs.selectedPet.lng,
          lat: cs.selectedPet.lat,
        };

        await state.editReport(newData).then(() => {
          Router.go("/found-pet");
        });
      });
      buttonNoFPEl.addEventListener("click", () => {
        foundPetCompEl.style.display = "none";
      });

      // SE ACCIONA EL BOTÓN DELETE
      buttonDeleteEl.addEventListener("click", () => {
        deletedPetCompEl.style.display = "block";
      });
      buttonYesDPEl.addEventListener("click", async () => {
        const newData = {
          id: cs.selectedPet.id,
          picURL: cs.selectedPet.picURL,
          name: cs.selectedPet.name,
          details: cs.selectedPet.details,
          found: true,
          lng: cs.selectedPet.lng,
          lat: cs.selectedPet.lat,
        };

        await state.deleteReport(newData).then(() => {
          Router.go("/deleted-pet");
        });
      });
      buttonNoDPEl.addEventListener("click", () => {
        foundPetCompEl.style.display = "none";
      });

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
          center: [cs.selectedPet.lng, cs.selectedPet.lat],
          zoom: 13,
        });
      }

      const mapCoordinates = initMap();

      formEl.addEventListener("submit", async (e: any) => {
        e.preventDefault();

        const nameValue = e.target["name"].value;
        const detailsValue = e.target["det"].value;

        const newData = {
          id: cs.selectedPet.id,
          picURL: cs.selectedPet.picURL,
          name: nameValue,
          details: detailsValue,
          found: false,
          lng: mapCoordinates.getCenter().toArray()[0],
          lat: mapCoordinates.getCenter().toArray()[1],
        };

        if (nameValue != "" && detailsValue != "") {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "none";

          if (picFile != undefined) {
            newData.picURL = picFile.dataURL;
          }

          await state.editReport(newData).then(() => {
            initMap();
            this.connectedCallbackSaved();
          });
        } else if (nameValue == "" && detailsValue != "") {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "none";
        } else if (nameValue != "" && detailsValue == "") {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "block";
        } else if (nameValue == "" && detailsValue == "") {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "block";
        }
      });
    }
    render() {
      const cs = state.getState();

      this.shadow.innerHTML = `
      <div class="main-page-container">
        <header-menu-comp></header-menu-comp>
        <div class="general-container">
          <found-pet-comp name="${cs.selectedPet.name}"></found-pet-comp>
          <deleted-pet-comp></deleted-pet-comp>
          <h1 class="main-title">Editar reporte de mascota</h1>
          <form class="edit-report-form">
            <form-input-comp class="name-input" type="text" name="name" value="${cs.selectedPet.name}">NOMBRE</form-input-comp>
            <img class="add-pet-pic" src="${cs.selectedPet.picURL}" alt="upload-picture">
            <div class="map-container">
              <div class="map"></div>
              <img class="pin-map" src="${pinMap}" alt="test-map">
            </div>
            <p class="paragraph-02">
              Editar punto de referencia.
            </p>
            <label class="details-label">OBSERVACIONES
              <textarea class="details-input" type="text" name="det">${cs.selectedPet.details}</textarea>
              <p class="details-required-field">Campo obligatorio</p>
            </label>
            <button-comp class="button-save" color="#ff7f87">Guardar</button-comp>
          </form>
          <button-comp class="button-found" color="#ff7f87">Reportar como encontrado</button-comp>
          <button-comp class="button-delete" color="#ff7f87">Eliminar reporte</button-comp>
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
      found-pet-comp {
        display: none;
        position: fixed;
        top: 35%;
      }
      deleted-pet-comp {
        display: none;
        position: fixed;
        top: 35%;
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
      .edit-report-form {
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
      .paragraph-02 {
        font-family: Poppins Light;
        font-size: 16px;
        color: #141414;
        text-align: center;
        width: 320px;
        margin: 0;
      }
      .button-save {
        margin-top: 20px;
      }
      .button-found {
        margin-top: 20px;
      }
      .button-delete {
        margin-top: 20px;
        margin-bottom: 50px;
      }
        `;

      this.shadow.appendChild(style);
    }
    connectedCallbackSaved() {
      this.renderSaved();
      const cs = state.getState();

      const mapEl = this.shadow.querySelector(".map") as HTMLElement;

      new mapboxgl.Map({
        container: mapEl,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [cs.selectedPet.lng, cs.selectedPet.lat],
        zoom: 13,
      });
    }
    renderSaved() {
      const cs = state.getState();

      this.shadow.innerHTML = `
        <div class="main-page-container">
          <header-menu-comp></header-menu-comp>
          <div class="general-container">
            <h1 class="main-title">Editar reporte de mascota</h1>
            <form class="edit-report-form">
              <form-input-comp type="text" name="name" value="${cs.selectedPet.name}">NOMBRE</form-input-comp>
              <img class="add-pet-pic" src="${cs.selectedPet.picURL}" alt="upload-picture">
              <div class="map-container">
                <div class="map"></div>
                <img class="pin-map" src="${pinMap}" alt="test-map">
              </div>
              <label class="details-label">OBSERVACIONES
                <textarea class="details-input" type="text" name="det">${cs.selectedPet.details}</textarea>
              </label>
              <div class="saved">
                <span>Guardado</span>
              </div>
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
          .edit-report-form {
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
          .paragraph-02 {
            font-family: Poppins Light;
            font-size: 16px;
            color: #141414;
            text-align: center;
            width: 320px;
            margin: 0;
          }
          .saved {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #2ecc71;
            border-radius: 8px;
            border: none;
            box-shadow: 2px 2px 2px #b2bec3;
            min-width: 315px;
            min-height: 50px;
            margin-top: 20px;
            transition: all 0.5s;
          }
          .saved span {
            color: #fafafa;
            font-family: Poppins Medium;
            font-size: 20px;
            margin: 0;
          }
          .button-delete {
            margin-bottom: 50px;
          }
        `;

      this.shadow.appendChild(style);
    }
  }
);
