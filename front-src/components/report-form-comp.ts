customElements.define(
  "report-form-comp",
  class extends HTMLElement {
    picURL: string;
    name: string;
    location: string;
    constructor() {
      super();
      this.render();
    }
    render() {
      this.picURL = this.getAttribute("picURL") || "";
      this.name = this.getAttribute("name") || "";
      this.location = this.getAttribute("location") || "";

      this.innerHTML = `
            <form class="report-form">
                <label class="report-form__label">¿DÓNDE LO VISTE?
                    <textarea class="report-form__textarea" type="text" name="info"></textarea>
                </label>
                <button-comp class="button-submit" color="#00a884">Enviar información</button-comp>
            </form>
          `;

      const style = document.createElement("style");
      style.innerHTML = `
            .report-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            background-color: #26302E;
            border-radius: 8px;
            padding: 12px;
            box-shadow: 0 0 50px #000000;
            }
            .report-form__label{
            font-family: Poppins Extra Light;
            font-size: 20px;
            color: #fafafa;
            margin: 0;
            }
            .report-form__textarea {
            display: block;
            width: 315px;
            height: 150px;
            font-family: Poppins Light;
            font-size: 20px;
            }
          `;

      this.appendChild(style);
    }
  }
);
