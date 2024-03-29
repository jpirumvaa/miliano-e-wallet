/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: Class that supports implementation of all controllers
 * @lastUpdated: Mar 29, 2023
 * @lastUpdateKeyChanges: added include to retrieve data related to the model being queried
 */

import { sendMessage } from "../utils/sendMessage";

export default class Controller {
  //class constructor
  constructor(tableName, model, include = []) {
    this.tableName = tableName;
    this.model = model;
    this.include = include;
  }
  //method to get all data form the model
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

  //method to get one item from the model. Item is identifid by it's id that is passed in the params
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

  //method to create one item in the model passed
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

  //method to create multiple items at the same time in the model provided
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

  //method to update one item form the model provided
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
