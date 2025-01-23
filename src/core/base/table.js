// Imports
import TableRenderer from "../components/tableRenderer.js";
import FetchApi from "../api/fetchApi.js";
import Headers from "./headers.js";
import TableBody from "./body.js";
import Pagination from "./pagination.js";

export default class SimplicityTable extends TableRenderer {
  constructor(tableOptions = {}, paginationOptions = {}) {
    super(tableOptions.tableId);
    this.tableOptions = {
      tableId: tableOptions.tableId,
      url: tableOptions.url,
      fetchType: tableOptions.fetchType,
      page: tableOptions.page,
      limit: tableOptions.limit,
      pageLimitList: tableOptions.pageLimitList,
    };
    this.paginationOptions = {
      onEnds: paginationOptions.onEnds,
      onEachSide: paginationOptions.onEachSide,
    };

    this.page = this.tableOptions.page;
    this.limit = this.tableOptions.limit;
    this.pageLimitList = tableOptions.pageLimitList;

    this.init();
  }

  async init() {
    // Fetch data
    await this.fetchData();
    // Render table elements
    this.renderElements();
    // Render table
    this.renderTable();
  }

  async fetchData() {
    try {
      // Fetch data based on the fetchType
      const fetchedData = new FetchApi(
        this.tableOptions.url,
        this.tableOptions.fetchType,
        this.paginationOptions
      );
      const data = await fetchedData.fetchData(this.page, this.limit);
      this.dataObject = data;
      this.headers = this.dataObject.headers;
      //console.log(this.dataObject); // Remove at the end. Used for debugging
      return this.dataObject;
    } catch (error) {
      console.error("Error retrieving data!!", error);
    }
  }

  renderTable() {
    // Render headers
    this.renderHeaders();
    // Update
    this.update();
  }

  renderHeaders() {
    const headers = new Headers(this);
    headers.renderHeaders();
  }

  renderBody() {
    const body = new TableBody(this);
    body.clearBody();
    body.renderRows(0);
    // Render pagination
    const pagination = new Pagination(this);
    pagination.render();
  }

  async update() {
    await this.fetchData();
    this.renderBody();
    this.updateRowsShownParagragh();
  }

  updateRowsShownParagragh() {
    this.rowsShownParagragh.textContent = `
      Showing ${this.dataObject.startIndex + 1} - 
      ${this.dataObject.endIndex} of ${this.dataObject.count} Total Rows
      `;
  }
}
