// Imports
import TableRenderer from "../components/tableRenderer.js";
import FetchApi from "../api/fetchApi.js";

export default class SimplicityTable extends TableRenderer {
  constructor(tableOptions = {}, paginationOptions = {}) {
    super(tableOptions.tableId);
    this.tableOptions = {
      tableId: tableOptions.tableId,
      url: tableOptions.url,
      fetchType: tableOptions.fetchType,
    };
    this.paginationOptions = {
      onEachSide: paginationOptions.onEachSide,
      onEnds: paginationOptions.onEnds,
      ellipsis: paginationOptions.ellipsis,
      firstLastButtons: paginationOptions.firstLastButtons,
      nextPrevButtons: paginationOptions.nextPrevButtons,
    };

    this.init();
  }

  async init() {
    // Fetch data
    await this.fetchData();
    // Render table
    this.renderElements();
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
      console.log(this.dataObject);
      return this.dataObject;
    } catch (error) {
      console.error("Error retrieving data!!", error);
    }
  }

  renderTable() {}

  renderHeaders() {}

  renderBody() {}

  renderPagination() {}
}
