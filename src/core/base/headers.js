// Imports
import HeaderRenderer from "../components/headerRenderer.js";
import { createNewElement } from "../../utils/utils.js";

export default class Headers extends HeaderRenderer {
  constructor(tableInstance) {
    super(tableInstance);
    this.tableInstance = tableInstance;
    this.headers = tableInstance.headers;
  }

  renderHeaders() {
    // Clear the headers
    this.clearHeaders();
    // Create a new row element
    const tr = createNewElement({
      tag: "tr",
      appendTo: this.tableInstance.thead,
    });
    // Add the first header
    this.createFirstHeader(tr);
    // Add the rest of the headers
    this.headers.forEach((header) => this.createHeader(header, tr));
  }

  clearHeaders() {
    this.tableInstance.thead.innerHTML = "";
  }
}
