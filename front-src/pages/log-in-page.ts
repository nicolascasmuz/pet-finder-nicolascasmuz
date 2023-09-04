import { state } from "../state";
import { Router } from "@vaadin/router";

customElements.define(
  "log-in-page",
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

      const logInFormEl = this.shadow.querySelector(
        ".login-form"
      ) as HTMLElement;
      const formInput1El = this.shadow.querySelector(".input1") as HTMLElement;
      const formInput2El = this.shadow.querySelector(".input2") as HTMLElement;
      const input1El = formInput1El.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const input2El = formInput2El.querySelector(
        ".form-input__input"
      ) as HTMLElement;
      const wrongDataEl = formInput2El.querySelector(
        ".wrong-data"
      ) as HTMLElement;

      logInFormEl.addEventListener("submit", async (e: any) => {
        e.preventDefault();

        const emailValue = e.target["email"].value;
        const passValue = e.target["pass"].value;

        state
          .loginUser(emailValue, passValue)
          .then(() => {
            Router.go("/home");
          })
          .catch(() => {
            input1El.style.border = "solid 3px #EA2027";
            input2El.style.border = "solid 3px #EA2027";
            wrongDataEl.style.display = "block";
          });
      });
    }
    render() {
      this.shadow.innerHTML = `
        <div class="main-page-container">
          <header-comp></header-comp>
          <div class="general-container">
            <h1 class="main-title">Iniciar sesión</h1>
            <p class="paragraph-01">
            Ingresá los siguientes datos para iniciar sesión
            </p>
            <form class="login-form">
              <form-input-comp class="input1" type="email" name="email">EMAIL</form-input-comp>
              <form-input-comp class="input2" type="password" name="pass">CONTRASEÑA</form-input-comp>
              <p class="paragraph-02">
                ¿Aún no estás registrado? <a href="/sign-up" class="login-link">Registrarse.</a>
              </p>
              <button-comp class="button-next" color="#ff7f87">Siguiente</button-comp>
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
          .main-page-picture {
            height: 200px;
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
          .login-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-top: 70px;
          }
          .button-next {
            margin-top: 60px;
            margin-bottom: 20px;
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
