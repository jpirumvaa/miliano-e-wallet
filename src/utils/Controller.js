import { sendMessage } from "../utils/sendMessage";

export default class Controller {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll(req, res, next) {
    try {
      const data = await this.tableName.findAll({});
      return sendMessage(res, 200, "Data fetched", data);
    } catch (error) {
      return sendMessage(res, 500, "Error occured", error);
    }
  }
  async createOne(req, res, next) {
    try {
      console.log(req.body.password);
      const data = await this.tableName.create({ ...req.body });
      return sendMessage(res, 200, "Created successfully", data);
    } catch (error) {
      return sendMessage(res, 500, "Error occured", error);
    }
  }
  async buchCreate(req, res, next) {
    try {
      const data = await this.tableName.bulkCreate({ ...req.body });
      return sendMessage(res, 200, "Created successfully", data);
    } catch (error) {
      return sendMessage(res, 500, "Error occured", error);
    }
  }

  postData(data) {
    // Implementation to post data to the table
    console.log(`Posting data to ${this.tableName}`);
    console.log("Data:", data);
    // Example: Posting data using AJAX
    // AJAX request to post data to the table
  }

  updateData(id, newData) {
    // Implementation to update data in the table
    console.log(`Updating data in ${this.tableName} with ID: ${id}`);
    console.log("New Data:", newData);
    // Example: Updating data using AJAX
    // AJAX request to update data in the table
  }
}
