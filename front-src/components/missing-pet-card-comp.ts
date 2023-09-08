const exitCross = require("url:../resources/exit-cross.png");

customElements.define(
  "missing-pet-card-comp",
  class extends HTMLElement {
    picURL: string;
    name: string;
    details: string;
    constructor() {
      super();
      this.render();
    }
    render() {
      this.picURL = this.getAttribute("picURL") || "";
      this.name = this.getAttribute("name") || "";
      this.details = this.getAttribute("details") || "";

      this.innerHTML = `
            <div class="comp-container">
              <button class="exit-button"><img class="exit-cross" src="${exitCross}" alt="exit-cross"></button>
              <report-form-comp></report-form-comp>
              <sent-info-comp></sent-info-comp>
              <div class="card__container">
                <img class="card__img" src="${this.picURL}" alt="pet-pic" >
                <div class="card__name-button">
                  <h3 class="card__name">${this.name}</h3>
                  <button class="card__button">Reportar</button>
                </div>
                <p class="card__details">${this.details}</p>
              </div>
            </div>
          `;

      const style = document.createElement("style");
      style.innerHTML = `
            .comp-container {
            display: grid;
            justify-items: center;
            align-items: center;
            }
            .exit-button {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #eb6372;
            border: none;
            border-radius: 50%;
            width: 65px;
            height: 65px;
            box-shadow: 0 0 50px #000000;
            margin-bottom: 35px;
            }
            .exit-cross {
            height: 25px;
            }
            report-form-comp {
            display: none;
            }
            sent-info-comp {
            display: none;
            }
            .card__container {
            display: grid;
            grid-template-rows: auto auto auto;
            grid-template-columns: 50% 50%;
            background-color: #26302E;
            border-radius: 8px;
            padding: 8px;
            box-shadow: 0 0 50px #000000;
            }
            .card__img {
            grid-row: 1;
            grid-column: 1 / span 2;
            }
            .card__name-button {
            grid-row: 2;
            grid-column: 1 / span 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin: 10px 0;
            }
            .card__name {
            font-family: "Poppins Semi Bold";
            font-size: 36px;
            line-height: 35px;
            color: #fafafa;
            max-width: 200px;
            margin: 0;
            }
            .card__button {
            align-self: center;
            justify-self: end;
            background-color: #eb6372;
            color: #fafafa;
            font-family: Poppins Medium;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            box-shadow: 2px 2px 2px #141414;
            width: 100px;
            height: 40px;
            }
            .card__details {
            grid-row: 3;
            grid-column: 1 / span 2;
            font-family: "Poppins Medium";
            font-size: 16px;
            color: #fafafa;
            line-height: 20px;
            width: 325px;
            margin: 0;
            }
          `;

      this.appendChild(style);
    }
  }
);
