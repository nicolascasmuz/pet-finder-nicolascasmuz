customElements.define(
  "form-input-comp",
  class extends HTMLElement {
    placeholder: string;
    value: string;
    name: string;
    type: string;
    constructor() {
      super();
      this.render();
    }
    render() {
      this.placeholder = this.getAttribute("placeholder") || "";
      this.value = this.getAttribute("value") || "";
      this.name = this.getAttribute("name") || "";
      this.type = this.getAttribute("type") || "";

      this.innerHTML = `
            <label class="form-input__label">
            ${this.textContent}
                <input class="form-input__input" type="${this.type}" name="${this.name}" placeholder="${this.placeholder}" value="${this.value}" >
            </label>
            <p class="mismatched-pass">Las contraseñas no coinciden, inténtelo otra vez</p>
            <p class="new-user">Ya existe un usuario registrado con este email</p>
            <p class="wrong-data">El usuario o la contraseña son incorrectos</p>
            <p class="wrong-pass">Contraseña incorrecta</p>
            <p class="required-field">Campo obligatorio</p>
          `;

      const style = document.createElement("style");
      style.innerHTML = `
        .form-input__label {
          font-family: Poppins Extra Light;
          font-size: 20px;
        }
        .form-input__input {
          display: block;
          font-size: 25px;
          box-shadow: 2px 2px 2px #b2bec3;
          border: solid 1px #b2bec3;
          border-radius: 3px;
          width: 315px;
          height: 40px;
        }
        .mismatched-pass {
          display: none;
          color: #EA2027;
          font-family: Poppins Medium;
          width: 250px;
          margin: 0;
        }  
        .new-user {
          display: none;
          color: #EA2027;
          font-family: Poppins Medium;
          width: 250px;
          margin: 0;
        }  
        .wrong-data {
          display: none;
          color: #EA2027;
          font-family: Poppins Medium;
          width: 250px;
          margin: 0;
        }
        .wrong-pass {
          display: none;
          color: #EA2027;
          font-family: Poppins Medium;
          width: 250px;
          margin: 0;
        }
        .required-field {
          display: none;
          color: #EA2027;
          font-family: Poppins Medium;
          width: 250px;
          margin: 0;
        }
        `;

      this.appendChild(style);
    }
  }
);
