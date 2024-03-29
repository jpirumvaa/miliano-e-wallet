import jwt from "jsonwebtoken";
import { checkAuth } from "../src/middleware/checkAuth";

describe("checkAuth middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { cookies: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 400 and an error message if no token is provided", () => {
    checkAuth.verifyUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: "Please login" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 and an error message if an invalid token is provided", () => {
    req.cookies["auth-token"] = "invalidtoken";

    checkAuth.verifyUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({ error: "Invalid Token" });
    expect(next).not.toHaveBeenCalled();
  });
});
