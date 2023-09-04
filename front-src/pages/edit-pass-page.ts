import { state } from "../state";
import { getSHA256ofString } from "../../back-src/lib/sha256";

customElements.define(
  "edit-pass-page",
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
        ".modify-pass-form"
      ) as HTMLElement;
      const currentPassEl = this.shadow.querySelector(
        ".current-pass"
      ) as HTMLElement;
      const newPassEl = this.shadow.querySelector(".new-pass") as HTMLElement;
      const repeatNewPassEl = this.shadow.querySelector(
        ".repeat-new-pass"
      ) as HTMLElement;

      const input1El = currentPassEl.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input2El = newPassEl.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input3El = repeatNewPassEl.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const wrongPassEl = currentPassEl.querySelector(
        ".wrong-pass"
      ) as HTMLElement;
      const mismatchedPassEl = repeatNewPassEl.querySelector(
        ".mismatched-pass"
      ) as HTMLElement;

      formEl.addEventListener("submit", async (e: any) => {
        e.preventDefault();

        const password = e.target["password"].value;
        const newPassword = e.target["new-password"].value;
        const repeatNewPassword = e.target["repeat-new-password"].value;

        console.log("password: ", password);
        console.log("newPassword: ", newPassword);
        console.log("repeatNewPassword: ", repeatNewPassword);

        if (password != "" || newPassword != "" || repeatNewPassword != "") {
          if (
            getSHA256ofString(password) == cs.password &&
            newPassword == repeatNewPassword
          ) {
            input1El.style.border = "solid 1px #b2bec3";
            input2El.style.border = "solid 1px #b2bec3";
            input3El.style.border = "solid 1px #b2bec3";
            wrongPassEl.style.display = "none";
            mismatchedPassEl.style.display = "none";

            const newPass = {
              userId: cs.userId,
              password: newPassword,
            };

            await state.editPass(newPass).then(() => {
              this.renderSaved();
            });
          } else if (
            getSHA256ofString(password) != cs.password &&
            newPassword != repeatNewPassword
          ) {
            input1El.style.border = "solid 3px #EA2027";
            input2El.style.border = "solid 3px #EA2027";
            input3El.style.border = "solid 3px #EA2027";
            wrongPassEl.style.display = "block";
            mismatchedPassEl.style.display = "block";
          } else if (getSHA256ofString(password) != cs.password) {
            input1El.style.border = "solid 3px #EA2027";
            input2El.style.border = "solid 1px #b2bec3";
            input3El.style.border = "solid 1px #b2bec3";
            wrongPassEl.style.display = "block";
            mismatchedPassEl.style.display = "none";
          } else if (newPassword != repeatNewPassword) {
            input1El.style.border = "solid 1px #b2bec3";
            input2El.style.border = "solid 3px #EA2027";
            input3El.style.border = "solid 3px #EA2027";
            wrongPassEl.style.display = "none";
            mismatchedPassEl.style.display = "block";
          }
        }
      });
    }
    render() {
      this.shadow.innerHTML = `
          <div class="main-page-container">
            <header-menu-comp></header-menu-comp>
            <div class="general-container">
              <h1 class="main-title">Modificar contraseña</h1>
                <form class="modify-pass-form">
                  <form-input-comp class="current-pass" type="password" name="password">CONTRASEÑA ACTUAL</form-input-comp>
                  <form-input-comp class="new-pass" type="password" name="new-password">CONTRASEÑA NUEVA</form-input-comp>
                  <form-input-comp class="repeat-new-pass" type="password" name="repeat-new-password">REPETIR CONTRASEÑA NUEVA</form-input-comp>
                  <button-comp class="button-guardar" color="#ff7f87">Guardar</button-comp>
                </form>
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
              margin: 40px 15px;
            }
            .modify-pass-form {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
              margin-top: 40px;
            }
            .button-guardar {
              margin-top: 20px;
            }
          `;

      this.shadow.appendChild(style);
    }
    renderSaved() {
      this.shadow.innerHTML = `
          <div class="main-page-container">
            <header-menu-comp></header-menu-comp>
            <div class="general-container">
              <h1 class="main-title">Modificar contraseña</h1>
                <form class="modify-pass-form">
                  <form-input-comp class="current-pass" type="password" name="password">CONTRASEÑA ACTUAL</form-input-comp>
                  <form-input-comp class="new-pass" type="password" name="new-password">CONTRASEÑA NUEVA</form-input-comp>
                  <form-input-comp class="repeat-new-pass" type="password" name="repeat-new-password">REPETIR CONTRASEÑA NUEVA</form-input-comp>
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
              margin: 40px 15px;
            }
            .modify-pass-form {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
              margin-top: 40px;
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
