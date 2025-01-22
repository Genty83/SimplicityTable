// Imports
import { createNewElement } from "../../utils/utils.js";

export default class HeaderRenderer {
  constructor(tableInstance) {
    this.tableInstance = tableInstance;
  }

  createFirstHeader(tr) {
    const firstHeader = createNewElement({
      tag: "th",
      attributes: { class: "first-header" },
      children: [
        createNewElement({
          tag: "input",
          attributes: { type: "checkbox", class: "table-checkbox" },
        }),
      ],
      appendTo: tr,
    });
    return firstHeader;
  }

  createHeader(header, tr) {
    const th = createNewElement({
      tag: "th",
      appendTo: tr,
    });
    const headerContainer = createNewElement({
      attributes: { class: "flex-col base-gap" },
      appendTo: th,
    });
    this.createHeaderTitle(header, headerContainer);
    return headerContainer;
  }

  createHeaderTitle(header, headerContainer) {
    const headerTitle = createNewElement({
      attributes: { class: "flex-row align-center justify-between" },
      appendTo: headerContainer,
    });

    createNewElement({
      tag: "span",
      textContent: header,
      appendTo: headerTitle,
    });

    createNewElement({
      tag: "button",
      attributes: { class: "table-sort-btn" },
      appendTo: headerTitle,
      children: [
        createNewElement({
          tag: "i",
          attributes: { class: "fas fa-sort" },
        }),
      ],
    });
    return headerTitle;
  }
}
