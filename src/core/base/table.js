// Imports
import TableRenderer from "../components/tableRenderer.js";
import FetchApi from "../api/fetchApi.js";
import Headers from "./headers.js";
import TableBody from "./body.js";

export default class SimplicityTable extends TableRenderer {
  constructor(tableOptions = {}, paginationOptions = {}) {
    super(tableOptions.tableId);
    this.tableOptions = {
      tableId: tableOptions.tableId,
      url: tableOptions.url,
      fetchType: tableOptions.fetchType,
    };
    this.paginationOptions = {
      onEnds: paginationOptions.onEnds,
      onEachSide: paginationOptions.onEachSide
    };

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
      const data = await fetchedData.fetchData();
      this.dataObject = data;
      this.headers =this.dataObject.headers;
      return this.dataObject;
    } catch (error) {
      console.error("Error retrieving data!!", error);
    }
  }

  renderTable() {
    // Render headers
    this.renderHeaders();
    // Render body
    this.renderBody();
  }

  renderHeaders() {
    const headers = new Headers(this);
    headers.renderHeaders();
  }

  renderBody() {
    const body = new TableBody(this);
    body.renderRows(0);
  }

  renderPagination() {}
}
