// const { Sequelize, Op } = require('sequelize');
import db from "../database/models";

import Controller from "../utils/Controller";
import { Wallet, Transaction } from "../database/models";
import { sendMessage } from "../utils/sendMessage";

export default class TransactionController extends Controller {
  constructor(sequelize) {
    const include = [
      {
        model: Wallet,
        as: "originWallet",
        // attributes: ["id", "name", "roleName", "email", "phoneNumber"],
      },
      {
        model: Wallet,
        as: "destinationWallet",
        // attributes: ["id", "name", "roleName", "email", "phoneNumber"],
      },
    ];

    super("Transaction", Transaction, include);
    this.sequelize = sequelize;

    this.getAll = this.getAll.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.getOne = this.getOne.bind(this);
  }
}
