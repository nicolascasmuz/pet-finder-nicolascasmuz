customElements.define(
  "found-pet-card-comp",
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
            <div class="card__container">
                <img class="card__img" src="${this.picURL}" alt="test-pic" >
                <div class="card__name-button">
                  <h3 class="card__name">${this.name}</h3>
                  <div class="card__found">ENCONTRADO</div>
                </div>
                <p class="card__details">${this.details}</p>
            </div>
          `;

      const style = document.createElement("style");
      style.innerHTML = `
            .card__container {
            display: grid;
            grid-template-rows: auto auto auto;
            grid-template-columns: 50% 50%;
            background-color: #26302E;
            border-radius: 8px;
            padding: 8px;
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
            .card__found {
            display: flex;
            justify-content: center;
            align-items: center;
            align-self: center;
            justify-self: end;
            background-color: #2ecc71;
            border-radius: 4px;
            color: #fafafa;
            font-family: Poppins Medium;
            font-size: 16px;
            border: none;
            box-shadow: 2px 2px 2px #141414;
            width: 125px;
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
