// Imports
import { createNewElement } from "../../utils/utils.js";

export default class PaginationRenderer {
  constructor(tableInstance) {
    this.tableInstance = tableInstance;

    this.data = tableInstance.dataObject;
    this.buttons = this.data.buttons;
  }

  createButtons() {
    this.buttons.forEach((button) => {
      const buttonElement = createNewElement({
        tag: "button",
        attributes: {
          class: `${
            parseInt(button, 10) === this.tableInstance.page
              ? "pagination-btn page-active"
              : "pagination-btn"
          }`,
        },
        textContent: button,
        appendTo: this.tableInstance.bottomMiddleContainer,
        eventHandlers: {
          click: () => {
            this.handleButtonClick(button);
          },
        },
      });
    });
  }

  handleButtonClick(button) {
    let newPageNumber;
    switch (button) {
      case this.data.labels.first:
        newPageNumber = 1;
        break;
      case this.data.labels.prev:
        newPageNumber = this.data.prev;
        break;
      case this.data.labels.next:
        newPageNumber = this.data.next;
        break;
      case this.data.labels.last:
        newPageNumber = this.data.totalPages;
        break;
      case "...":
        // Handle "..." button if needed, otherwise ignore
        return;
      default:
        newPageNumber = parseInt(button, 10);
        break;
    }
    this.pageHandler(newPageNumber);
  }

  pageHandler(pageNumber) {
    this.tableInstance.page = pageNumber;
    this.tableInstance.update();
  }
}
