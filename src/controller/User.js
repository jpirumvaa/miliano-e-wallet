/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: Controler class for users. It inherts from Controller class, implements its methods, and adds login and logout.
 * @lastUpdated: Mar 29, 2023
 */

//external imports
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//internal imports
import Controller from "../utils/Controller";
import { User } from "../database/models";
import { sendMessage } from "../utils/sendMessage";

export default class UserController extends Controller {
  constructor() {
    super("User", User);
    this.getAll = this.getAll.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.getOne = this.getOne.bind(this);
  }
  async login(req, res, next) {
    const { password, email } = req.body;
    const user = await User.findOne({
      where: { email },
      raw: true,
      attributes: ["id", "name", "email", "password", "roleName"],
    });
    if (!user) {
      return sendMessage(res, 403, "Incorrect credentials");
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return sendMessage(res, 403, "Incorrect credentials");
    }
    try {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.roleName,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      //set HTTP only cookies after successful login
      res.cookie("auth-token", token, {
        path: "/",
        sameSite: "strict",
        httpOnly: true,
        maxAge: "18000000",
      });
      return sendMessage(res, 200, "Logged in successfully", {
        token,
        user,
      });
    } catch (error) {
      return sendMessage(res, 500, "Login failed");
    }
  }
  async logout(req, res, next) {
    //kill the cookie created on login
    res.clearCookie("auth-token", { path: "/" });
    return sendMessage(res, 200, "Logged out successfully");
  }
}
