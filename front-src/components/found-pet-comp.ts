customElements.define(
  "found-pet-comp",
  class extends HTMLElement {
    name: string;
    constructor() {
      super();
      this.render();
    }
    render() {
      this.name = this.getAttribute("name") || "";

      this.innerHTML = `
            <div class="report-window">
                <label class="report-form__label">¿YA ENCONTRASTE A ${this.name.toUpperCase()}?</label>
                <button class="button-yes">SI</button>
                <button class="button-no">NO</button>
            </div>
          `;

      const style = document.createElement("style");
      style.innerHTML = `
            .report-window {
            display: grid;
            grid-template-rows: auto auto;
            grid-template-columns: auto auto;
            flex-direction: column;
            gap: 10px;
            background-color: #26302E;
            border-radius: 8px;
            max-width: 320px;
            padding: 12px;
            box-shadow: 0 0 50px #000000;
            }
            .report-form__label{
            grid-row: 1;
            grid-column: 1 / span 2;
            font-family: Poppins Extra Light;
            font-size: 20px;
            color: #fafafa;
            margin: 0;
            }
            .button-yes {
            grid-row: 2;
            grid-column: 1;
            background-color: #00a884;
            border-radius: 8px;
            color: #fafafa;
            font-family: Poppins Medium;
            font-size: 20px;
            border: none;
            min-width: 50%;
            min-height: 50px;
            margin: 0;
            }
            .button-no {
            grid-row: 2;
            grid-column: 2;
            background-color: #00a884;
            border-radius: 8px;
            color: #fafafa;
            font-family: Poppins Medium;
            font-size: 20px;
            border: none;
            min-width: 50%;
            min-height: 50px;
            margin: 0;
            }
          `;

      this.appendChild(style);
    }
  }
);
