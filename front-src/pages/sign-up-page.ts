import { state } from "../state";
import { Router } from "@vaadin/router";

customElements.define(
  "sign-up-page",
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

      const signUpFormEl = this.shadow.querySelector(
        ".signup-form"
      ) as HTMLElement;
      const formInput1El = this.shadow.querySelector(".input1") as HTMLElement;
      const formInput2El = this.shadow.querySelector(".input2") as HTMLElement;
      const formInput3El = this.shadow.querySelector(".input3") as HTMLElement;
      const input1El = formInput1El.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input2El = formInput2El.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input3El = formInput3El.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const mismatchedPassEl = formInput3El.querySelector(
        ".mismatched-pass"
      ) as HTMLElement;
      const newUserEl = formInput1El.querySelector(".new-user") as HTMLElement;

      signUpFormEl.addEventListener("submit", async (e: any) => {
        e.preventDefault();

        const emailValue = e.target["email"].value;
        const passValue = e.target["pass"].value;
        const checkPassValue = e.target["checkpass"].value;

        if (passValue == checkPassValue) {
          state.signupUser(emailValue, passValue).then(() => {
            input2El.style.border = "solid 1px #b2bec3";
            input3El.style.border = "solid 1px #b2bec3";
            mismatchedPassEl.style.display = "none";
            if (cs.newUser == true) {
              cs.email = emailValue;
              cs.password = passValue;
              state.setState(cs);
              Router.go("/location");
            } else if (cs.newUser == false) {
              input1El.style.border = "solid 3px #EA2027";
              newUserEl.style.display = "block";
            }
          });
        } else if (passValue != checkPassValue) {
          input1El.style.border = "solid 1px #b2bec3";
          input2El.style.border = "solid 3px #EA2027";
          input3El.style.border = "solid 3px #EA2027";
          newUserEl.style.display = "none";
          mismatchedPassEl.style.display = "block";
        }
      });
    }
    render() {
      this.shadow.innerHTML = `
        <div class="main-page-container">
          <header-comp></header-comp>
          <div class="general-container">
            <h1 class="main-title">Registrarse</h1>
            <p class="paragraph-01">
              Ingresá los siguientes datos para realizar el registro
            </p>
            <form class="signup-form">
              <form-input-comp class="input1" type="email" name="email">EMAIL</form-input-comp>
              <form-input-comp class="input2" type="password" name="pass">CONTRASEÑA</form-input-comp>
              <form-input-comp class="input3" type="password" name="checkpass">CONFIRMAR CONTRASEÑA</form-input-comp>
              <p class="paragraph-02">
                ¿Ya tenés una cuenta? <a href="/log-in" class="login-link">Iniciar sesión.</a>
              </p>
              <button-comp class="button-access" color="#ff7f87">Acceder</button-comp>
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
            width: 280px;
            margin: 0;
          }
          .signup-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-top: 40px;
          }
          .button-access {
            margin: 20px 0
          }
          .paragraph-02 {
            font-family: Poppins Light;
            font-size: 16px;
            color: #141414;
            text-align: center;
            margin: 0;
          }
          .login-link {
            color: #ff7f87;
            text-decoration: none;
          }
        `;

      this.shadow.appendChild(style);
    }
  }
);
