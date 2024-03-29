import UserController from "../src/controller/User";
import { User } from "../src/database/models";
import bcrypt from "bcryptjs";
import { sendMessage } from "../src/utils/sendMessage";

jest.mock("../src/database/models");
jest.mock("bcryptjs");
jest.mock("../src/utils/sendMessage");

describe("UserController", () => {
  let userController;
  let req;
  let res;
  let next;

  beforeEach(() => {
    userController = new UserController();
    req = { body: {} };
    res = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login method", () => {
    it("should return 403 if user does not exist", async () => {
      User.findOne.mockResolvedValueOnce(null);

      await userController.login(req, res, next);

      expect(sendMessage).toHaveBeenCalledWith(
        res,
        403,
        "Incorrect credentials"
      );
      expect(res.cookie).not.toHaveBeenCalled();
    });

    it("should return 403 if password is incorrect", async () => {
      User.findOne.mockResolvedValueOnce({
        email: "test@example.com",
        password: "hashedpassword",
      });
      bcrypt.compare.mockResolvedValueOnce(false);

      await userController.login(req, res, next);

      expect(sendMessage).toHaveBeenCalledWith(
        res,
        403,
        "Account is not activated"
      );
      expect(res.cookie).not.toHaveBeenCalled();
    });
  });

  describe("logout method", () => {
    it("should clear the auth-token cookie and return 200", async () => {
      await userController.logout(req, res, next);

      expect(res.clearCookie).toHaveBeenCalledWith("auth-token", { path: "/" });
      expect(sendMessage).toHaveBeenCalledWith(
        res,
        200,
        "Logged out successfully"
      );
    });
  });
});
