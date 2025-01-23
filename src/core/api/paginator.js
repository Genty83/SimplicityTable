/**
 * @module Paginator
 * @description
 * The Paginator module extends the functionality of the GeneratePaginationButtons module to handle paginating results.
 * It provides a class for paginating results and returning an object containing the paginated data and metadata,
 * including headers and pagination buttons. The module also allows customizing the number of buttons displayed
 * at the start, end, and on each side of the current page, as well as custom labels for ellided, first, prev,
 * next, and last buttons.
 *
 * Dependencies:
 * - GeneratePaginationButtons: A class for generating pagination buttons.
 *
 * Example usage:
 * ```javascript
 * const paginator = new Paginator(results, headers, 1, 10, 2, 2, { ellided: "...", first: "«", prev: "prev", next: "next", last: "»" });
 * const paginatedData = paginator.paginate();
 * console.log(paginatedData);
 * ```
 */

/**
 * Class to generate pagination buttons based on the current page and total pages.
 */
class GeneratePaginationButtons {
  /**
   * @param {Array} results - The array of results to paginate.
   * @param {Array} headers - The array of headers for the results.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of results per page.
   * @param {number} onEnds - Number of buttons to display at the start and end of the pagination.
   * @param {number} onEachSide - Number of buttons to display on each side of the current page.
   * @param {Object} labels - An object containing custom labels for ellided, first, prev, next, and last buttons.
   */
  constructor(
    results = [],
    headers = [],
    page = 1,
    limit = 10,
    onEnds = 1,
    onEachSide = 2,
    labels = {
      ellided: "...",
      first: "«",
      prev: "prev",
      next: "next",
      last: "»",
    }
  ) {
    this.results = results;
    this.headers = headers;
    this.page = page;
    this.limit = limit;
    this.onEnds = onEnds;
    this.onEachSide = onEachSide;
    this.labels = labels;

    this.count = this.results.length;
    this.totalPages = Math.ceil(this.count / this.limit);
    this.startIndex = (this.page - 1) * this.limit;
    this.endIndex = Math.min(this.startIndex + this.limit, this.count);

    // Initialize class variables
    this.pageLength = this.getPageLength();
    this.startPage = this.getStartPage();
  }

  /**
   * Computes the length of the page range based on the onEachSide property.
   * @returns {number} The length of the page range.
   */
  getPageLength() {
    return this.onEachSide * 2 + 1;
  }

  /**
   * Computes the start page based on the current page and page length.
   * @returns {number} The start page number.
   */
  getStartPage() {
    return Math.floor((this.page - 1) / this.pageLength) * this.pageLength + 1;
  }

  /**
   * Generates an array of pagination button labels based on the current page, total pages, and specified button range.
   * @returns {Array} An array of button labels for pagination.
   */
  getButtonsArray() {
    const buttons = [];

    this.addNavigationButtons(buttons);
    this.addLeadingButtons(buttons);
    this.addMiddleButtons(buttons);
    this.addTrailingButtons(buttons);
    this.addFinalNavigationButtons(buttons);

    return buttons;
  }

  /**
   * Adds navigation buttons (first and prev) to the pagination buttons array.
   * @param {Array} buttons - The array of buttons to which navigation buttons will be added.
   */
  addNavigationButtons(buttons) {
    if (this.page > 1) {
      buttons.push(this.labels.first, this.labels.prev);
    }
  }

  /**
   * Adds leading buttons to the pagination buttons array.
   * @param {Array} buttons - The array of buttons to which leading buttons will be added.
   */
  addLeadingButtons(buttons) {
    for (
      let i = Math.max(1, this.startPage - this.onEachSide);
      i < this.startPage;
      i++
    ) {
      buttons.push(i.toString());
    }

    if (this.startPage > this.onEnds + 1) {
      buttons.push(this.labels.ellided);
    }
  }

  /**
   * Adds middle buttons to the pagination buttons array.
   * @param {Array} buttons - The array of buttons to which middle buttons will be added.
   */
  addMiddleButtons(buttons) {
    for (
      let i = this.startPage;
      i < this.startPage + this.pageLength && i <= this.totalPages;
      i++
    ) {
      buttons.push(i.toString());
    }

    if (this.startPage + this.pageLength <= this.totalPages - this.onEnds) {
      buttons.push(this.labels.ellided);
    }
  }

  /**
   * Adds trailing buttons to the pagination buttons array.
   * @param {Array} buttons - The array of buttons to which trailing buttons will be added.
   */
  addTrailingButtons(buttons) {
    for (
      let i = this.startPage + this.pageLength;
      i < this.startPage + this.pageLength + this.onEnds &&
      i <= this.totalPages;
      i++
    ) {
      buttons.push(i.toString());
    }
  }

  /**
   * Adds final navigation buttons (next and last) to the pagination buttons array.
   * @param {Array} buttons - The array of buttons to which final navigation buttons will be added.
   */
  addFinalNavigationButtons(buttons) {
    if (this.page < this.totalPages) {
      buttons.push(this.labels.next, this.labels.last);
    }
  }
}

/**
 * Paginator class that extends GeneratePaginationButtons to handle paginating results.
 */
export default class Paginator extends GeneratePaginationButtons {
  /**
   * @param {Array} results - The array of results to paginate.
   * @param {Array} headers - The array of headers for the results.
   * @param {number} page - The current page number.
   * @param {number} limit - The number of results per page.
   * @param {number} onEnds - Number of buttons to display at the start and end of the pagination.
   * @param {number} onEachSide - Number of buttons to display on each side of the current page.
   * @param {Object} labels - An object containing custom labels for ellided, first, prev, next, and last buttons.
   */
  constructor(
    results = [],
    headers = [],
    page = 1,
    limit = 10,
    onEnds = 2,
    onEachSide = 2,
    labels = {
      ellided: "...",
      first: "«",
      prev: "prev",
      next: "next",
      last: "»",
    }
  ) {
    super(results, headers, page, limit, onEnds, onEachSide, labels);
  }

  /**
   * Paginates the results and returns an object containing the paginated data and metadata.
   * @returns {Object} An object with paginated results, headers, buttons, and pagination metadata.
   */
  paginate() {
    return {
      results: this.results.slice(this.startIndex, this.endIndex),
      headers: this.headers,
      buttons: this.getButtonsArray(),
      page: this.page,
      limit: this.limit,
      count: this.count,
      totalPages: this.totalPages,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      next: this.endIndex < this.count ? this.page + 1 : null,
      previous: this.startIndex > 0 ? this.page - 1 : null,
      labels: this.labels,
    };
  }
}
