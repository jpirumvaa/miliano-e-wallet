import { transact } from "../src/middleware/transact";
import { Wallet } from "../src/database/models";
import db from "../src/database/models";
import { sendMessage } from "../src/utils/sendMessage";

jest.mock("../src/database/models");
jest.mock("../src/utils/sendMessage");

describe("transact function", () => {
  let req;
  let res;
  let next;
  let transaction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
    transaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };
    db.sequelize.transaction.mockResolvedValue(transaction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 404 if origin or destination wallet is not found", async () => {
    Wallet.findByPk.mockResolvedValueOnce(null);
    Wallet.findByPk.mockResolvedValueOnce({});

    await transact(req, res, next);

    expect(sendMessage).toHaveBeenCalledWith(res, 404, "Wallet not found");
  });

  it("should return 424 if origin account has insufficient balance", async () => {
    Wallet.findByPk.mockResolvedValueOnce({ balance: 100 });
    Wallet.findByPk.mockResolvedValueOnce({});

    req.body = { originWalletId: 1, destinationWalletId: 2, amount: 200 };

    await transact(req, res, next);

    expect(sendMessage).toHaveBeenCalledWith(res, 424, "Insufficient balance");
  });

  it("should handle errors and return 500 if an error occurs during fund transfer", async () => {
    Wallet.findByPk.mockResolvedValueOnce({ balance: 300 });
    Wallet.findByPk.mockResolvedValueOnce({ balance: 200 });

    req.body = { originWalletId: 1, destinationWalletId: 2, amount: 100 };

    const error = new Error("Database error");
    Wallet.prototype.save.mockRejectedValueOnce(error);

    await transact(req, res, next);

    expect(transaction.rollback).toHaveBeenCalled();
    expect(sendMessage).toHaveBeenCalledWith(
      res,
      500,
      "Error transfering funds"
    );
    expect(next).not.toHaveBeenCalled();
  });
});
