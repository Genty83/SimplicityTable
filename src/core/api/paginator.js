/**
 * Pagination Module
 *
 * This module provides classes and methods to handle pagination of large datasets.
 * The primary purpose is to split a large set of results into manageable pages and 
 * generate pagination controls to navigate through these pages.
 *
 * Classes:
 *    - GeneratePaginationButtons: A base class that generates pagination button labels 
 *      based on the current page, total pages, and specified button range.
 *    - Paginator: A subclass that extends GeneratePaginationButtons to handle the 
 *      actual pagination of results and provide paginated data along with metadata.
 *
 * Features:
 *    - Initialize with results, headers, current page, limit per page, and button ranges.
 *    - Calculate the total number of pages based on the results and limit.
 *    - Generate pagination buttons with navigation controls (e.g., "prev", "next", "«", "»").
 *    - Handle edge cases to ensure proper display of pagination buttons.
 *    - Provide paginated results, headers, and metadata (e.g., current page, limit, count).
 *    - Facilitate easy navigation through paginated results.
 *
 * Usage:
 *    Instantiate the Paginator class with the desired parameters and call the paginate() 
 *    method to get the paginated data and buttons.
 *    
 * Example:
 *    const paginator = new Paginator(results, headers, page=2, limit=10, onEnds=1, onEachSide=2);
 *    const paginationData = paginator.paginate();
 *    console.log(paginationData);
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
   */
  constructor(
    results = [],
    headers = [],
    page = 1,
    limit = 10,
    onEnds = 1,
    onEachSide = 2
  ) {
    this.results = results;
    this.headers = headers;
    this.page = page;
    this.limit = limit;
    this.onEnds = onEnds;
    this.onEachSide = onEachSide;

    this.count = this.results.length;
    this.totalPages = Math.ceil(this.count / this.limit);
    this.startIndex = (this.page - 1) * this.limit;
    this.endIndex = Math.min(this.startIndex + this.limit, this.count);
  }

  /**
   * Generates an array of pagination button labels based on the current page, total pages, and specified button range.
   * @returns {Array} An array of button labels for pagination.
   */
  getButtonsArray() {
    const buttons = [];
    const pageLength = this.onEachSide * 2 + 1;
    const startPage = Math.floor((this.page - 1) / pageLength) * pageLength + 1;

    if (this.page > 1) {
      buttons.push("«", "prev");
    }

    for (let i = Math.max(1, startPage - this.onEachSide); i < startPage; i++) {
      buttons.push(i.toString());
    }

    if (startPage > this.onEnds + 1) {
      buttons.push("...");
    }

    for (
      let i = startPage;
      i < startPage + pageLength && i <= this.totalPages;
      i++
    ) {
      buttons.push(i.toString());
    }

    if (startPage + pageLength <= this.totalPages - this.onEnds) {
      buttons.push("...");
    }

    for (
      let i = startPage + pageLength;
      i < startPage + pageLength + this.onEnds && i <= this.totalPages;
      i++
    ) {
      buttons.push(i.toString());
    }

    if (this.page < this.totalPages) {
      buttons.push("next", "»");
    }

    return buttons;
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
   */
  constructor(
    results = [],
    headers = [],
    page = 1,
    limit = 10,
    onEnds = 2,
    onEachSide = 2
  ) {
    super(results, headers, page, limit, onEnds, onEachSide);
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
    };
  }
}
