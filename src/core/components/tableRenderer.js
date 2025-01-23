// Imports
import { createNewElement } from "../../utils/utils.js";

export default class TableRenderer {
  constructor(tableId) {
    this.container = document.querySelector(".table-container");
    this.tableId = tableId;
  }

  renderElements() {
    this.createContainerElements();
    this.createTableElements();
    this.createTopContainerElements();
    this.createActionContainerElements();
    this.createBottomContainerElements();
  }

  createContainerElements() {
    this.topContainer = createNewElement({
      attributes: { class: "top-container" },
      appendTo: this.container,
    });

    this.actionContainer = createNewElement({
      attributes: { class: "action-container" },
      appendTo: this.container,
    });

    this.middleContainer = createNewElement({
      attributes: { class: "middle-container" },
      appendTo: this.container,
    });

    this.bottomContainer = createNewElement({
      attributes: { class: "bottom-container" },
      appendTo: this.container,
    });
  }

  createTableElements() {
    this.table = createNewElement({
      tag: "table",
      attributes: { id: this.tableId, class: "table" },
      appendTo: this.middleContainer,
    });

    this.thead = createNewElement({
      tag: "thead",
      appendTo: this.table,
    });

    this.tbody = createNewElement({
      tag: "tbody",
      appendTo: this.table,
    });
  }

  createTopContainerElements() {
    this.rowsShownParagragh = createNewElement({
      tag: "p",
      textContent: "Rows shown",
      appendTo: this.topContainer,
    });

    this.topRightContainer = createNewElement({
      attributes: { class: "flex-row align-center base-gap" },
      appendTo: this.topContainer,
    });

    this.searchInput = createNewElement({
      tag: "input",
      attributes: {
        class: "table-header-control quick-search-input",
        type: "text",
        placeholder: "Quick Search...",
      },
      appendTo: this.topRightContainer,
    });
  }

  createActionContainerElements() {
    this.loader = createNewElement({
      attributes: { class: "loader" },
      appendTo: this.actionContainer,
    });
  }

  createBottomContainerElements() {
    this.bottomLeftContainer = createNewElement({
      attributes: { class: "flex-row align-center base-gap" },
      appendTo: this.bottomContainer,
    });

    this.bottomMiddleContainer = createNewElement({
      attributes: { class: "flex-row align-center base-gap" },
      appendTo: this.bottomContainer,
    });

    this.bottomRightContainer = createNewElement({
      attributes: { class: "flex-row align-center base-gap" },
      appendTo: this.bottomContainer,
    });
  }
}
