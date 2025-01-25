import { createNewElement } from "../../utils/utils.js";
import ToastMessaging from "../../utils/toasts.js";

/**
 * Class responsible for rendering pagination controls for a table.
 */
export default class PaginationRenderer {
  /**
   * Constructs a PaginationRenderer instance.
   * @param {Object} tableInstance - The instance of the table that requires pagination.
   */
  constructor(tableInstance) {
    this.tableInstance = tableInstance;
    this.data = tableInstance.dataObject;
    this.buttons = this.data.buttons;

    // Create a toast messaging instance
    this.toast = new ToastMessaging(this.tableInstance.actionContainer);
  }

  /**
   * Creates pagination buttons based on the data object.
   */
  createButtons() {
    this.buttons.forEach((button) => {
      createNewElement({
        tag: "button",
        attributes: {
          class: `pagination-btn ${
            parseInt(button, 10) === this.tableInstance.page
              ? "page-active"
              : ""
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

  /**
   * Handles the button click events for pagination.
   * @param {string} button - The button that was clicked.
   */
  handleButtonClick(button) {
    let newPageNumber;
    switch (button) {
      case this.data.labels.first:
        newPageNumber = 1;
        break;
      case this.data.labels.prev:
        newPageNumber = this.data.previous;
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
    }
    this.pageHandler(newPageNumber);
  }

  /**
   * Updates the table to display the selected page.
   * @param {number} pageNumber - The page number to display.
   */
  pageHandler(pageNumber) {
    this.tableInstance.page = pageNumber;
    this.tableInstance.update();
  }

  /**
   * Creates a dropdown for selecting the number of rows per page.
   */
  createRowsPerPageSelect() {
    this.tableInstance.bottomLeftContainer.innerHTML = ""; // Clear the container

    createNewElement({
      tag: "label",
      attributes: { for: "rows-per-page" },
      textContent: "Rows per page:",
      appendTo: this.tableInstance.bottomLeftContainer,
    });

    const rowsPerPageSelect = createNewElement({
      tag: "select",
      attributes: {
        id: "rows-per-page",
        class: "rows-per-page table-control",
      },
      eventHandlers: {
        change: (e) => {
          this.tableInstance.filterParams = {};
          this.updateTable(e.target.value);
          this.toast.showMessage(
            `Warning! All filters will be reset. Showing ${e.target.value} rows per page.`,
            "warning"
          );
        },
      },
      appendTo: this.tableInstance.bottomLeftContainer,
    });

    this.tableInstance.pageLimitList.forEach((limit) => {
      createNewElement({
        tag: "option",
        attributes: { value: limit },
        textContent: limit,
        appendTo: rowsPerPageSelect,
      });
    });

    rowsPerPageSelect.value = this.data.limit;
  }

  /**
   * Creates a dropdown for selecting a specific page to navigate to.
   */
  createGoToPageSelect() {
    this.tableInstance.bottomRightContainer.innerHTML = ""; // Clear the container

    createNewElement({
      tag: "p",
      textContent: "Page",
      appendTo: this.tableInstance.bottomRightContainer,
    });

    const goToPageSelect = createNewElement({
      tag: "select",
      attributes: {
        id: "go-to-page",
        class: "go-to-page table-control",
      },
      eventHandlers: {
        change: (e) => {
          this.pageHandler(parseInt(e.target.value, 10));
          this.toast.showMessage(`Navigating to page ${e.target.value}`, "info");
        },
      },
      appendTo: this.tableInstance.bottomRightContainer,
    });

    for (let i = 1; i <= this.data.totalPages; i++) {
      createNewElement({
        tag: "option",
        attributes: { value: i },
        textContent: i,
        appendTo: goToPageSelect,
      });
    }
    goToPageSelect.value = this.tableInstance.page;

    createNewElement({
      tag: "p",
      textContent: `of ${this.data.totalPages} pages.`,
      appendTo: this.tableInstance.bottomRightContainer,
    });
  }

  /**
   * Updates the table with the selected rows per page limit.
   * @param {number} limit - The number of rows per page.
   */
  updateTable(limit) {
    this.tableInstance.page = 1;
    this.tableInstance.limit = parseInt(limit, 10);
    this.tableInstance.update(true);
  }
}
