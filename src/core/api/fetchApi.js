/**
 * @module FetchApi
 * @description
 * The FetchApi module provides a class for fetching data from a specified URL and paginating the results. 
 * It supports fetching CSV data and allows filtering and paginating the fetched data based on specified parameters.
 * 
 * Dependencies:
 * - CsvFetcher: A class for fetching and converting CSV data from a specified URL into a structured JSON format.
 * - Paginator: A class for paginating data.
 * 
 * Example usage:
 * ```javascript
 * const fetchApi = new FetchApi("https://example.com/data.csv", "csv", { onEnds: 2, onEachSide: 2 }, { column: "value" });
 * fetchApi.fetchData(1, 10).then(data => {
 *   console.log(data);
 * }).catch(error => {
 *   console.error(error);
 * });
 * ```
 */


// Imports
import Paginator from "../api/paginator.js";
import CsvFetcher from "../api/csvFetcher.js";

/**
 * FetchApi class for fetching and paginating data.
 */
export default class FetchApi {
  /**
   * Constructor for the FetchApi class.
   * @param {string} url - The URL of the data to fetch.
   * @param {string} fetchType - The type of data to fetch (default: "csv").
   * @param {Object} paginationParams - Pagination parameters.
   * @param {number} paginationParams.onEnds - Number of pages to display at the beginning and end (default: 1).
   * @param {number} paginationParams.onEachSide - Number of pages to display on each side of the current page (default: 1).
   * @param {Object} [filterParams={}] - An optional dictionary of parameters to filter the data.
   */
  constructor(url, fetchType = "csv", paginationParams = {}, filterParams = {}) {
    this.url = url;
    this.fetchType = fetchType;
    this.paginationParams = {
      onEnds: paginationParams.onEnds || 1,
      onEachSide: paginationParams.onEachSide || 1,
    };
    this.filterParams = filterParams;
  }

  /**
   * Fetch data from the specified URL based on the fetch type and paginate the results.
   * @param {number} page - The current page number (default: 1).
   * @param {number} limit - The number of results per page (default: 10).
   * @returns {Promise<Object>} - A promise that resolves to the paginated data.
   * @throws {Error} - Throws an error if the fetch type is invalid.
   */
  async fetchData(page = 1, limit = 10) {
    if (this.fetchType === "csv") {
      return this.fetchCsv(page, limit);
    } else {
      throw new Error("Invalid fetch type");
    }
  }

  /**
   * Fetch CSV data from the specified URL and paginate the results.
   * @param {number} page - The current page number (default: 1).
   * @param {number} limit - The number of results per page (default: 10).
   * @returns {Promise<Object>} - A promise that resolves to the paginated CSV data.
   * @throws {Error} - Throws an error if there is an issue fetching the CSV data.
   */
  async fetchCsv(page = 1, limit = 10) {
    try {
      const csvFetcher = new CsvFetcher(this.url, this.filterParams);
      const data = await csvFetcher.fetch();
      const paginator = new Paginator(
        data,
        csvFetcher.headers,
        page,
        limit,
        this.paginationParams.onEnds,
        this.paginationParams.onEachSide,
      );
      return paginator.paginate();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching CSV data");
    }
  }
}
