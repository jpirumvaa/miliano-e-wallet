import bcrypt from "bcryptjs";
import {
  hashSignupData,
  setActivation,
  setDisactivation,
} from "../src/middleware/data_manipulators/user";
import { sendMessage } from "../src/utils/sendMessage";

jest.mock("bcryptjs");
jest.mock("../src/utils/sendMessage");

describe("Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("hashSignupData middleware", () => {
    it("should hash password and nid in request body", async () => {
      req.body.password = "password123";
      req.body.nid = "1234567890";

      bcrypt.hash.mockResolvedValue("hashedPassword");

      await hashSignupData(req, res, next);

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(bcrypt.hash).toHaveBeenCalledWith("1234567890", 10);
      expect(req.body.password).toBe("hashedPassword");
      expect(req.body.nid).toBe("hashedPassword");
      expect(next).toHaveBeenCalled();
      expect(sendMessage).not.toHaveBeenCalled();
    });

    it("should send internal server error if hashing fails", async () => {
      req.body.password = "password123";
      bcrypt.hash.mockRejectedValueOnce(new Error("Hashing error"));

      await hashSignupData(req, res, next);

      expect(sendMessage).toHaveBeenCalledWith(
        res,
        500,
        "Internal server error"
      );
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("setActivation middleware", () => {
    it("should set active property in request body to true", async () => {
      await setActivation(req, res, next);

      expect(req.body.active).toBe(true);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("setDisactivation middleware", () => {
    it("should set active property in request body to false", async () => {
      await setDisactivation(req, res, next);

      expect(req.body.active).toBe(false);
      expect(next).toHaveBeenCalled();
    });
  });
});
