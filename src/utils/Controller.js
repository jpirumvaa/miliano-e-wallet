import { sendMessage } from "../utils/sendMessage";

export default class Controller {
  constructor(tableName, model, include = []) {
    this.tableName = tableName;
    this.model = model;
    this.include = include;
  }

  async getAll(req, res, next) {
    try {
      const data = await this.model.findAll({ include: this.include });
      return sendMessage(res, 200, `${this.tableName}s fetched`, data);
    } catch (error) {
      return sendMessage(
        res,
        500,
        `Error getting ${this.tableName?.toLowerCase()}`,
        error
      );
    }
  }
  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const data = await this.model.findOne({
        where: { id },
        include: this.include,
      });
      return sendMessage(res, 200, `${this.tableName} fetched`, data);
    } catch (error) {
      return sendMessage(
        res,
        500,
        `Error getting ${this.tableName?.toLowerCase()}`,
        error
      );
    }
  }
  async createOne(req, res, next) {
    try {
      const data = await this.model.create({ ...req.body });
      return sendMessage(
        res,
        200,
        `${this.tableName} created successfully`,
        data
      );
    } catch (error) {
      return sendMessage(
        res,
        500,
        `Error creating${this.tableName?.toLowerCase()}`,
        error
      );
    }
  }
  async bulkCreate(req, res, next) {
    try {
      const data = await this.model.bulkCreate(req.body);
      return sendMessage(
        res,
        200,
        `${this.tableName} created successfully`,
        data
      );
    } catch (error) {
      return sendMessage(
        res,
        500,
        `Error creating ${this.tableName?.toLowerCase()}s`,
        error
      );
    }
  }
  async updateOne(req, res, next) {
    const { id } = req.params;
    try {
      const data = await this.model.update({ ...req.body }, { where: { id } });
      return sendMessage(
        res,
        200,
        `${this.tableName} updated successfully`,
        data
      );
    } catch (error) {
      return sendMessage(
        res,
        500,
        `Error updating ${this.tableName?.toLowerCase()}`,
        error
      );
    }
  }
}
