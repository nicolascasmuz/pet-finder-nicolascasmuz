customElements.define(
  "set-radius-form-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      this.innerHTML = `
            <form class="search-form">
                <select name="distance" class="select-distance">
                    <option value="1000">1 km</option>
                    <option value="2000">2 kms</option>
                    <option value="5000">5 kms</option>
                    <option value="10000">10 kms</option>
                    <option value="20000">20 kms</option>
                    <option value="50000">50 kms</option>
                </select>
                <button class="search-button">Buscar</button>
            </form>
            `;

      const style = document.createElement("style");
      style.innerHTML = `
            .search-form {
            display: flex;
            gap: 10px;
            width: 100%;
            padding: 10px 0 10px 10px;
            }
            .select-distance {
            display: block;
            background-color: #26302e;
            border-radius: 8px;
            color: #fafafa;
            font-family: Poppins Medium;
            font-size: 20px;
            border: none;
            min-width: 100px;
            min-height: 50px;
            margin: 0;
            }
            .search-button {
            background-color: #26302e;
            border-radius: 8px;
            color: #fafafa;
            font-family: Poppins Medium;
            font-size: 20px;
            border: none;
            min-width: 100px;
            min-height: 50px;
            margin: 0;
            }
          `;

      this.appendChild(style);
    }
  }
);
