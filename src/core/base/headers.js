// Imports
import HeaderRenderer from "../components/headerRenderer.js";
import { createNewElement } from "../../utils/utils.js";

/**
 * Class representing the headers of a table.
 * Extends from HeaderRenderer.
 */
export default class Headers extends HeaderRenderer {
  /**
   * Create Headers instance.
   * @param {Object} tableInstance - The table instance containing the headers and thead.
   */
  constructor(tableInstance) {
    super(tableInstance);
    this.tableInstance = tableInstance;
    this.headers = tableInstance.headers;
  }

  /**
   * Render the headers of the table.
   * Clears the current headers and creates a new row of headers.
   */
  renderHeaders() {
    // Create a new row element
    const tr = createNewElement({
      tag: "tr",
      appendTo: this.tableInstance.thead,
    });
    // Add the first header
    this.createFirstHeader(tr);
    // Add the rest of the headers
    this.headers.forEach((header) =>
      this.createHeader(header, tr, this.headers.indexOf(header))
    );
  }
}
