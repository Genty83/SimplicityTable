
// Imports
import PaginationRenderer from "../components/paginationRenderer.js";

export default class Pagination extends PaginationRenderer {
  constructor(tableInstance) {
    super(tableInstance);
  }

  render() {
    // Clear the container before rendering
    this.tableInstance.bottomMiddleContainer.innerHTML = "";
    // Create the pagination buttons
    this.createButtons();
  }
}