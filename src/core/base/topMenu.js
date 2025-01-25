// Imports
import { createNewElement } from "../../utils/utils.js";
// Dialog imports
import RowOptions from "../dialog/rowOptions.js";

export default class TopMenu {
  constructor(tableInstance) {
    this.tableInstance = tableInstance;

    this.buttons = [
      { icon: "fas fa-plus", tooltip: "Add", event: () => this.addRow() },
      { icon: "fas fa-edit", tooltip: "Edit" },
      { icon: "fas fa-trash", tooltip: "Delete" },
    ];

    // Create top menu
    this.rowOptions = new RowOptions(this.tableInstance);
  }

  createTopMenu() {
    const topMenu = createNewElement({
      attributes: { class: "top-menu" },
      appendTo: this.tableInstance.topRightContainer,
    });

    // Create buttons
    this.buttons.forEach((button) => {
      createNewElement({
        tag: "button",
        attributes: {
          class: "top-menu-btn tooltip-bottom-right",
          tooltip: button.tooltip,
        },
        appendTo: topMenu,
        children: [
          createNewElement({
            tag: "i",
            attributes: { class: button.icon },
          }),
        ],
        eventHandlers: { click: button.event },
      });
    });
  }

  addRow() {
    this.rowOptions.open();
  }
}
