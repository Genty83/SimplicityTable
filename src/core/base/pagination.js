// Imports
import PaginationRenderer from "../components/paginationRenderer.js";

/**
 * Class responsible for rendering pagination controls for a table.
 * Extends the PaginationRenderer class to include specific render logic.
 */
export default class Pagination extends PaginationRenderer {
  /**
   * Constructs a Pagination instance.
   * @param {Object} tableInstance - The instance of the table that requires pagination.
   */
  constructor(tableInstance) {
    super(tableInstance);
  }

  /**
   * Renders the pagination controls including buttons,
   * rows per page select, and go to page select.
   */
  render() {
    // Clear the container before rendering
    this.tableInstance.bottomMiddleContainer.innerHTML = "";
    // Create the pagination buttons
    this.createButtons();
    // Create the rows per page select
    this.createRowsPerPageSelect();
    // Create the go to page select
    this.createGoToPageSelect();
  }
}
