// Imports
import { createNewElement } from "../../utils/utils.js";

export default class TableBody {
  constructor(tableInstance) {
    this.tableInstance = tableInstance;
    this.data = tableInstance.dataObject.results;
    this.buffer = 20; // Number of rows to render outside the viewport
    this.visibleRows = []; // To store currently visible rows
    this.initObserver();
  }

  /**
   * Initializes the Intersection Observer to manage virtual rendering.
   */
  initObserver() {
    const options = {
      root: this.tableInstance.tbody,
      rootMargin: "0px",
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver(
      this.handleIntersect.bind(this),
      options
    );
  }

  /**
   * Handles the intersection events to manage row visibility.
   * @param {Array} entries - Intersection Observer entries.
   */
  handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rowIndex = parseInt(entry.target.getAttribute("data-index"), 10);
        this.renderRows(rowIndex);
      }
    });
  }

  /**
   * Renders the rows based on the current viewport.
   * @param {number} startIndex - The index to start rendering from.
   */
  renderRows(startIndex) {
    const endIndex = Math.min(startIndex + this.buffer, this.data.length);
    const fragment = document.createDocumentFragment();

    for (let i = startIndex; i < endIndex; i++) {
      if (!this.visibleRows.includes(i)) {
        const row = this.createRow(this.data[i]);
        row.setAttribute("data-index", i);
        fragment.appendChild(row);
        this.visibleRows.push(i);
      }
    }

    this.tableInstance.tbody.appendChild(fragment);
    this.updateObserver();
  }

  /**
   * Updates the Intersection Observer to observe new rows.
   */
  updateObserver() {
    const rows = this.tableInstance.tbody.querySelectorAll("tr");
    rows.forEach((row) => this.observer.observe(row));
  }

  /**
   * Creates a table row and populates it with cells based on the provided data.
   * @param {Object} data - The data for a single row.
   * @returns {HTMLElement} - The created table row element.
   */
  createRow(data) {
    const row = createNewElement({ tag: "tr" });
    this.createFirstCell(row);
    for (let key in data) {
      createNewElement({
        tag: "td",
        textContent: data[key],
        appendTo: row,
      });
    }
    return row;
  }

  /**
   * Creates the first cell of a row which includes a checkbox.
   * @param {HTMLElement} row - The table row element to which the first cell will be appended.
   * @returns {HTMLElement} - The created first cell element.
   */
  createFirstCell(row) {
    const firstCell = createNewElement({
      tag: "td",
      attributes: { class: "first-cell" },
      appendTo: row,
    });
    createNewElement({
      tag: "input",
      attributes: { type: "checkbox", class: "table-checkbox" },
      appendTo: firstCell,
    });
    return firstCell;
  }
}
