/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: Controller class for wallets. It inherts from Controller class and implements its methods.
 * @lastUpdated: Mar 29, 2023
 */
import Controller from "../utils/Controller";
import { Wallet, User } from "../database/models";

export default class WalletController extends Controller {
  constructor() {
    const include = [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "roleName", "email", "phoneNumber"],
      },
    ];

    super("Wallet", Wallet, include);

    this.getAll = this.getAll.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.getOne = this.getOne.bind(this);
  }
}
