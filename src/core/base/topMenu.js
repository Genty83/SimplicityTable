// Imports
import { createNewElement } from "../../utils/utils.js";

export default class TopMenu {
  constructor(tableInstance) {
    this.tableInstance = tableInstance;

    this.buttons = [
      { icon: "fas fa-plus", tooltip: "Add" },
      { icon: "fas fa-edit", tooltip: "Edit" },
      { icon: "fas fa-trash", tooltip: "Delete" },
    ];
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
      });
    });
  }
}
