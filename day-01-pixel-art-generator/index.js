class GridManager {
  constructor() {
    this.rangeWidth = document.getElementById("width-range");
    this.rangeWidthText = document.getElementById("width-value");
    this.rangeHeight = document.getElementById("height-range");
    this.rangeHeightText = document.getElementById("height-value");
    this.createGridBtn = document.getElementById("submit-grid");
    this.clearGridBtn = document.getElementById("clear-grid");
    this.eraseColorBtn = document.getElementById("erase-btn");
    this.paintBtn = document.getElementById("paint-btn");
    this.containerDiv = document.querySelector(".container");
    this.colorInput = document.getElementById("color-input");
    this.isDrawing = false;

    this.initialize();
  }

  initialize() {
    this.rangeWidthText.textContent = 1;
    this.rangeHeightText.textContent = 1;

    this.createGridBtn.addEventListener("click", () => this.createGrid());
    this.clearGridBtn.addEventListener("click", () => this.clearGrid());
    this.eraseColorBtn.addEventListener("click", () => this.eraseGrid());
    this.rangeWidth.addEventListener("change", () => this.updateWidthText());
    this.rangeHeight.addEventListener("change", () => this.updateHeightText());

    this.containerDiv.addEventListener("mousedown", (e) =>
      this.startDrawing(e)
    );
    this.containerDiv.addEventListener("mousemove", (e) => this.draw(e));
    this.containerDiv.addEventListener("mouseup", () => this.stopDrawing());
    this.containerDiv.addEventListener("mouseleave", () => this.stopDrawing());

    window.onload = () => {
      this.rangeHeight.value = 0;
      this.rangeWidth.value = 0;
    };
  }

  createGrid() {
    const gridCols = parseInt(this.rangeWidth.value, 10);
    const gridRows = parseInt(this.rangeHeight.value, 10);

    this.containerDiv.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= gridRows; i++) {
      const row = document.createElement("div");
      row.classList.add("gridRow");
      row.id = `grid-row-${i}`;

      for (let j = 1; j <= gridCols; j++) {
        const col = document.createElement("div");
        col.classList.add("gridCol");
        col.dataset.id = `grid-col-${j}`;
        row.appendChild(col);
      }

      fragment.appendChild(row);
    }

    this.containerDiv.appendChild(fragment);
  }

  clearGrid() {
    this.containerDiv.innerHTML = "";
  }

  eraseGrid() {
    if (!document.getElementById("grid-row-1")) return;
    this.createGrid();
  }

  startDrawing(e) {
    if (!e.target.classList.contains("gridCol")) return;
    this.isDrawing = true;
    this.colorCell(e.target);
  }

  draw(e) {
    if (!this.isDrawing || !e.target.classList.contains("gridCol")) return;
    this.colorCell(e.target);
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  colorCell(cell) {
    cell.style.backgroundColor = `${this.colorInput.value}`;
  }

  updateWidthText() {
    this.rangeWidthText.textContent = this.rangeWidth.value;
  }

  updateHeightText() {
    this.rangeHeightText.textContent = this.rangeHeight.value;
  }
}

// Instantiate the GridManager
const gridManager = new GridManager();
