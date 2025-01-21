
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
}