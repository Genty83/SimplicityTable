import { createNewElement } from "../../utils/utils.js";

/**
 * Class representing the header rendering for a table.
 */
export default class HeaderRenderer {
  /**
   * Create a HeaderRenderer instance.
   * @param {Object} tableInstance - The table instance containing the headers and thead.
   */
  constructor(tableInstance) {
    this.tableInstance = tableInstance;
    this.data = tableInstance.dataObject.results; // Assuming results is the array of row data
  }

  /**
   * Get unique values from a specific column.
   * @param {number} columnIndex - The index of the column to get unique values from.
   * @return {Array} An array of unique values.
   */
  getUniqueColumnValues(columnIndex) {
    const values = new Set();
    if (!this.data || this.data.length === 0) {
      console.error("Data is not available or empty.");
      return [];
    }
    if (!this.tableInstance.headers[columnIndex]) {
      console.error("Invalid column index.");
      return [];
    }

    for (const row of this.data) {
      const columnName = this.tableInstance.headers[columnIndex];
      if (row[columnName] !== undefined) {
        values.add(row[columnName]);
      }
    }
    return Array.from(values);
  }

  /**
   * Create the first header element.
   * @param {HTMLElement} tr - The row element to append the header to.
   * @return {HTMLElement} The created header element.
   */
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
    this.createHeaderBorder(firstHeader);

    return firstHeader;
  }

  /**
   * Create a header element.
   * @param {string} header - The header text.
   * @param {HTMLElement} tr - The row element to append the header to.
   * @param {number} columnIndex - The index of the column for the header.
   * @return {HTMLElement} The created header container element.
   */
  createHeader(header, tr, columnIndex) {
    const th = createNewElement({
      tag: "th",
      appendTo: tr,
    });
    const headerContainer = createNewElement({
      attributes: { class: "flex-col base-gap base-padding" },
      appendTo: th,
    });
    this.createHeaderTitle(header, headerContainer);
    this.createHeaderContent(headerContainer, header, columnIndex);
    this.createHeaderBorder(th);

    return headerContainer;
  }

  /**
   * Create the header title element.
   * @param {string} header - The header text.
   * @param {HTMLElement} headerContainer - The container element to append the title to.
   * @return {HTMLElement} The created header title element.
   */
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
      attributes: { class: "icon-btn table-sort-btn" },
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

  /**
   * Create the header content elements.
   * @param {HTMLElement} container - The container element to append the content to.
   * @param {string} header - The header text.
   * @param {number} columnIndex - The index of the column for the content.
   */
  createHeaderContent(container, header, columnIndex) {
    const headerContent = createNewElement({
      attributes: { class: "flex-col base-gap" },
      appendTo: container,
    });

    createNewElement({
      tag: "input",
      attributes: {
        type: "text",
        class: "table-header-control table-search",
        placeholder: `Search By ${header}`,
      },
      appendTo: headerContent,
    });

    const select = createNewElement({
      tag: "select",
      attributes: {
        class: "table-header-control table-filter",
      },
      appendTo: headerContent,
    });

    createNewElement({
      tag: "option",
      textContent: `Filter By [${header}]`,
      attributes: { value: "" },
      appendTo: select,
    });

    const uniqueValues = this.getUniqueColumnValues(columnIndex);
    uniqueValues.forEach((value) => {
      createNewElement({
        tag: "option",
        textContent: value,
        attributes: { value: value },
        appendTo: select,
      });
    });
  }

  /**
   * Create the header border element.
   * @param {HTMLElement} th - The header element to append the border to.
   */
  createHeaderBorder(th) {
    createNewElement({
      tag: "div",
      attributes: { class: "header-bottom-border" },
      appendTo: th,
    });
  }
}
