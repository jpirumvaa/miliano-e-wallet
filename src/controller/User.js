import Controller from "../utils/Controller";
import { User } from "../database/models";
import { sendMessage } from "../utils/sendMessage";

export default class UserController extends Controller {
  constructor() {
    super(User);
    this.getAll = this.getAll.bind(this);
    this.createOne = this.createOne.bind(this);
  }
  async login(req, res, next) {
    console.log(req.body);
    return sendMessage(res, 200, "Login success");
  }
}
