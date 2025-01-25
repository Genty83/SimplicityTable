
//
import Modal from "../../utils/modal.js";

export default class RowOptions extends Modal {
  constructor(tableInstance) {
    super("Row Options", { width: "400px", height: "400px" });

    this.tableInstance = tableInstance;
  }
}  