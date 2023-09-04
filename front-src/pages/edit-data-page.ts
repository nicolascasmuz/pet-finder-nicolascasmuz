import { state } from "../state";
import { Dropzone } from "dropzone";

customElements.define(
  "edit-data-page",
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
        ".modify-data-form"
      ) as HTMLElement;
      const addProfilePicEl = this.shadow.querySelector(
        ".add-profile-pic"
      ) as HTMLElement;
      const addProfilePicSrcEl = this.shadow.querySelector(
        ".add-profile-pic"
      ) as HTMLSourceElement;

      const nicknameInputEl = this.shadow.querySelector(
        ".nickname-input"
      ) as HTMLElement;
      const emailInputEl = this.shadow.querySelector(
        ".email-input"
      ) as HTMLElement;
      const location1InputEl = this.shadow.querySelector(
        ".location1-input"
      ) as HTMLElement;
      const location2InputEl = this.shadow.querySelector(
        ".location2-input"
      ) as HTMLElement;

      const input1El = nicknameInputEl.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input2El = emailInputEl.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input3El = location2InputEl.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input4El = location1InputEl.querySelector(
        ".form-input__input"
      ) as HTMLElement;

      const requiredField1El = nicknameInputEl.querySelector(
        ".required-field"
      ) as HTMLElement;
      const requiredField2El = emailInputEl.querySelector(
        ".required-field"
      ) as HTMLElement;
      const requiredField3El = location2InputEl.querySelector(
        ".required-field"
      ) as HTMLElement;
      const requiredField4El = location1InputEl.querySelector(
        ".required-field"
      ) as HTMLElement;

      let picFile;

      let myDropzone = new Dropzone(addProfilePicEl, {
        url: "/file/post",
        autoProcessQueue: false,
      });

      myDropzone.on("addedfile", (file) => {
        picFile = file;
        addProfilePicSrcEl.src = file;
      });

      formEl.addEventListener("submit", async (e: any) => {
        e.preventDefault();

        const nickname = e.target["nick"].value;
        const email = e.target["email"].value;
        const address = e.target["address"].value;
        const location = e.target["loc"].value;

        const newData = {
          userId: cs.userId,
          picURL: cs.picURL,
          nickname,
          email,
          address,
          location,
        };

        if (picFile != undefined) {
          newData.picURL = picFile.dataURL;
        }

        if (nickname != "" && email != "" && location != "" && address != "") {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 1px #b2bec3";
          input3El.style.border = "solid 1px #b2bec3";
          input4El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "none";
          requiredField3El.style.display = "none";
          requiredField4El.style.display = "none";

          await state.editData(newData).then(() => {
            this.renderSaved();
          });
        } else if (
          nickname == "" &&
          email != "" &&
          location != "" &&
          address != ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 1px #b2bec3";
          input3El.style.border = "solid 1px #b2bec3";
          input4El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "none";
          requiredField3El.style.display = "none";
          requiredField4El.style.display = "none";
        } else if (
          nickname != "" &&
          email == "" &&
          location != "" &&
          address != ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 1px #b2bec3";
          input4El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "block";
          requiredField3El.style.display = "none";
          requiredField4El.style.display = "none";
        } else if (
          nickname != "" &&
          email != "" &&
          location == "" &&
          address != ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 1px #b2bec3";
          input3El.style.border = "solid 3px #EA2027";
          input4El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "none";
          requiredField3El.style.display = "block";
          requiredField4El.style.display = "none";
        } else if (
          nickname != "" &&
          email != "" &&
          location != "" &&
          address == ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 1px #b2bec3";
          input3El.style.border = "solid 1px #b2bec3";
          input4El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "none";
          requiredField3El.style.display = "none";
          requiredField4El.style.display = "block";
        } else if (
          nickname != "" &&
          email == "" &&
          location == "" &&
          address == ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 3px #EA2027";
          input4El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "block";
          requiredField3El.style.display = "block";
          requiredField4El.style.display = "block";
        } else if (
          nickname == "" &&
          email != "" &&
          location == "" &&
          address == ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 1px #b2bec3";
          input3El.style.border = "solid 3px #EA2027";
          input4El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "none";
          requiredField3El.style.display = "block";
          requiredField4El.style.display = "block";
        } else if (
          nickname == "" &&
          email == "" &&
          location != "" &&
          address == ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 1px #b2bec3";
          input4El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "block";
          requiredField3El.style.display = "none";
          requiredField4El.style.display = "block";
        } else if (
          nickname == "" &&
          email == "" &&
          location == "" &&
          address != ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 3px #EA2027";
          input4El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "block";
          requiredField3El.style.display = "block";
          requiredField4El.style.display = "none";
        } else if (
          nickname == "" &&
          email == "" &&
          location != "" &&
          address != ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 1px #b2bec3";
          input4El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "block";
          requiredField3El.style.display = "none";
          requiredField4El.style.display = "none";
        } else if (
          nickname != "" &&
          email == "" &&
          location == "" &&
          address != ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 3px #EA2027";
          input4El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "block";
          requiredField3El.style.display = "block";
          requiredField4El.style.display = "none";
        } else if (
          nickname != "" &&
          email != "" &&
          location == "" &&
          address == ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 1px #b2bec3";
          input3El.style.border = "solid 3px #EA2027";
          input4El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "none";
          requiredField3El.style.display = "block";
          requiredField4El.style.display = "block";
        } else if (
          nickname == "" &&
          email != "" &&
          location != "" &&
          address == ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 1px #b2bec3";
          input3El.style.border = "solid 1px #b2bec3";
          input4El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "none";
          requiredField3El.style.display = "none";
          requiredField4El.style.display = "block";
        } else if (
          nickname != "" &&
          email == "" &&
          location == "" &&
          address != ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 3px #EA2027";
          input4El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "block";
          requiredField3El.style.display = "block";
          requiredField4El.style.display = "none";
        } else if (
          nickname == "" &&
          email != "" &&
          location == "" &&
          address != ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 1px #b2bec3";
          input3El.style.border = "solid 3px #EA2027";
          input4El.style.border = "solid 1px #b2bec3";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "none";
          requiredField3El.style.display = "block";
          requiredField4El.style.display = "none";
        } else if (
          nickname != "" &&
          email == "" &&
          location != "" &&
          address == ""
        ) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 1px #b2bec3";
          input4El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "none";
          requiredField2El.style.display = "block";
          requiredField3El.style.display = "none";
          requiredField4El.style.display = "block";
        } else if (
          nickname == "" &&
          email == "" &&
          location == "" &&
          address == ""
        ) {
          input1El.style.border = "solid 3px #EA2027";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 3px #EA2027";
          input4El.style.border = "solid 3px #EA2027";
          requiredField1El.style.display = "block";
          requiredField2El.style.display = "block";
          requiredField3El.style.display = "block";
          requiredField4El.style.display = "block";
        }
      });
    }
    render() {
      const cs = state.getState();

      this.shadow.innerHTML = `
          <div class="main-page-container">
            <header-menu-comp></header-menu-comp>
            <div class="general-container">
              <h1 class="main-title">Modificar datos</h1>
                <form class="modify-data-form" action="/target" class="dropzone">
                  <center>
                    <img
                    action="/target"
                    class="add-profile-pic"
                    src="${cs.picURL}"
                    alt="add-profile-pic"
                    />
                  </center>
                  <form-input-comp class="nickname-input" type="text" name="nick" value="${cs.nickname}">NICK</form-input-comp>
                  <form-input-comp class="email-input" type="email" name="email" value="${cs.email}">EMAIL</form-input-comp>
                  <form-input-comp class="location1-input" type="text" name="address" value="${cs.address}">DIRECCIÓN</form-input-comp>
                  <form-input-comp class="location2-input" type="text" name="loc" value="${cs.location}">LOCALIDAD</form-input-comp>
                  <button-comp class="button-guardar" color="#ff7f87">Guardar</button-comp>
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
              margin: 40px 15px 15px 15px;
            }
            .modify-data-form {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
              margin: 15px 0;
            }
            .add-profile-pic {
              height: 100px;
              border-radius: 8px;
            }
            .button-guardar {
              margin-top: 20px;
            }
          `;

      this.shadow.appendChild(style);
    }
    renderSaved() {
      const cs = state.getState();

      this.shadow.innerHTML = `
          <div class="main-page-container">
            <header-menu-comp></header-menu-comp>
            <div class="general-container">
              <h1 class="main-title">Modificar datos</h1>
                <form class="modify-data-form" action="/target" class="dropzone">
                  <center>
                    <img
                    action="/target"
                    class="add-profile-pic"
                    src="${cs.picURL}"
                    alt="add-profile-pic"
                    />
                  </center>
                  <form-input-comp type="text" name="nick" value="${cs.nickname}">NICK</form-input-comp>
                  <form-input-comp type="email" name="email" value="${cs.email}">EMAIL</form-input-comp>
                  <form-input-comp type="text" name="address" value="${cs.address}">DIRECCIÓN</form-input-comp>
                  <form-input-comp type="text" name="loc" value="${cs.location}">LOCALIDAD</form-input-comp>
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
              margin: 40px 15px 15px 15px;
            }
            .modify-data-form {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
              margin: 15px 0;
            }
            .add-profile-pic {
              height: 100px;
              border-radius: 8px;
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
          `;

      this.shadow.appendChild(style);
    }
  }
);
