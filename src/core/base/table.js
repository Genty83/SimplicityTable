// Imports
import TableRenderer from "../components/tableRenderer.js";
import FetchApi from "../api/fetchApi.js";
import Headers from "./headers.js";
import TableBody from "./body.js";
import Pagination from "./pagination.js";
import ToastMessaging from "../../utils/toasts.js";

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
    this.filterParams = {};

    this.init();
  }

  async init() {
    // Fetch data
    await this.fetchData();
    // Render table elements
    this.renderElements();
    // Add toast instance
    this.toast = new ToastMessaging(this.actionContainer);
    // Render table
    this.update(true);
  }

  async fetchData() {
    try {
      // Fetch data based on the fetchType
      const fetchedData = new FetchApi(
        this.tableOptions.url,
        this.tableOptions.fetchType,
        this.paginationOptions
      );
      const data = await fetchedData.fetchData(
        this.page,
        this.limit,
        this.filterParams
      );
      this.dataObject = data;
      this.headers = this.dataObject.headers;
      //console.log(this.dataObject); // Remove at the end. Used for debugging
      return this.dataObject;
    } catch (error) {
      console.error("Error retrieving data!!", error);
    }
  }

  renderHeaders() {
    this.thead.innerHTML = "";
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

  async update(refreshHeaders = false) {
    await this.fetchData(this.page, this.limit, this.filterParams);
    this.showLoader();
    setTimeout(() => {
      if (refreshHeaders) this.renderHeaders();
      this.renderBody();
      this.hideLoader();
    }, 1000);
    this.updateRowsShownParagragh();
  }

  updateRowsShownParagragh() {
    const start = this.dataObject.startIndex + 1;
    const end = this.dataObject.endIndex;
    const count = this.dataObject.count;

    this.rowsShownParagragh.textContent = `
      Showing ${start} to ${end} of ${count} total entries
      `;
  }

  showLoader() {
    this.loader.style.display = "flex";
  }

  hideLoader() {
    this.loader.style.display = "none";
  }

  addFilterParams(header, value) {
    if (value === "All" || value === "") {
      delete this.filterParams[header];
      this.toast.showMessage(`Filter removed for ${header}`, "warning");
    } else {
      this.filterParams[header] = value;
      this.toast.showMessage(`Filter added for ${header}`, "success");
    }
    this.update();
  }
}
