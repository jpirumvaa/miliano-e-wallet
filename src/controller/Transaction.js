/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: Controller that controls transactions. It inherits Controller class. It is called after transact method which does the actual transaction
 * @lastUpdated: Mar 29, 2023
 */

import Controller from "../utils/Controller";
import { Wallet, Transaction } from "../database/models";

export default class TransactionController extends Controller {
  constructor(sequelize) {
    const include = [
      {
        model: Wallet,
        as: "originWallet",
      },
      {
        model: Wallet,
        as: "destinationWallet",
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
