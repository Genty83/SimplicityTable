/**
 * @module CsvFetcher
 * @description
 * The CsvFetcher module provides a class for fetching and converting CSV data from a specified URL into a structured JSON format.
 * It also supports filtering the fetched data based on specified parameters.
 *
 * Dependencies:
 * - PapaParse: A CSV parser library to convert CSV data to JSON.
 *
 * Example usage:
 * ```javascript
 * const csvFetcher = new CsvFetcher("https://example.com/data.csv", { column: "value" });
 * csvFetcher.fetch().then(data => {
 *   console.log(data);
 * }).catch(error => {
 *   console.error(error);
 * });
 * ```
 */

export default class CsvFetcher {
  /**
   * Constructor for the CsvFetcher class.
   * @param {string} url - The URL of the CSV file to fetch.
   * @param {Object} [filterParams={}] - An optional dictionary of parameters to filter the data.
   */
  constructor(url, filterParams = {}) {
    this.url = url;
    this.filterParams = filterParams;
    this.headers = [];
  }

  /**
   * Fetch the CSV data from the specified URL and convert it to JSON using PapaParse.
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects representing the CSV data.
   * @throws {Error} - Throws an error if the HTTP request fails.
   */
  async fetch() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      const jsonData = this.csvToJsonStructured(data);
      return this.filterData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching CSV data");
    }
  }

  /**
   * Convert CSV data to a structured JSON format using PapaParse.
   * @param {string} data - The CSV data as a string.
   * @returns {Array<Object>} - An array of objects representing the CSV data.
   */
  csvToJsonStructured(data) {
    const parsedData = Papa.parse(data, { header: true, skipEmptyLines: true });
    this.headers = parsedData.meta.fields;
    return parsedData.data;
  }

  /**
   * Filter the JSON data based on the provided filter parameters with lazy filtering.
   * @param {Array<Object>} data - The JSON data to filter.
   * @returns {Array<Object>} - The filtered JSON data.
   */
  filterData(data) {
    return data.filter((row) => {
      return Object.entries(this.filterParams).every(([key, value]) => {
        if (row[key] !== undefined && row[key] !== null) {
          const rowValue = row[key].toString().toLowerCase();
          const filterValue = value.toString().toLowerCase();
  
          // Check if the row value is a number and if the filter value is a number
          if (!isNaN(rowValue) && !isNaN(filterValue)) {
            return parseFloat(rowValue) === parseFloat(filterValue);
          }
  
          // Fallback to string comparison if not numbers
          return rowValue.includes(filterValue);
        }
        return false;
      });
    });
  }
  
  getHeaders() {
    return this.headers;
  }
}
