import { addWalletCreationData } from "../src/middleware/data_manipulators/wallet";
import { Wallet } from "../src/database/models";
import { sendMessage } from "../src/utils/sendMessage";

jest.mock("../src/database/models");
jest.mock("../src/utils/sendMessage");

describe("addWalletCreationData middleware", () => {
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

  it("should send 400 if user has 5 or more wallets", async () => {
    Wallet.findAll.mockResolvedValueOnce([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ]);

    await addWalletCreationData(req, res, next);

    expect(Wallet.findAll).toHaveBeenCalledWith({
      where: { userId: req.body.userId },
      raw: true,
    });
    expect(sendMessage).toHaveBeenCalledWith(
      res,
      400,
      "User is allowed upto 5 accounts"
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("should send 500 if an error occurs during wallet creation data retrieval", async () => {
    Wallet.findAll.mockRejectedValueOnce(new Error("Database error"));

    await addWalletCreationData(req, res, next);

    expect(Wallet.findAll).toHaveBeenCalledWith({
      where: { userId: req.body.userId },
      raw: true,
    });
    expect(sendMessage).toHaveBeenCalledWith(
      res,
      500,
      "Error creating a wallet"
    );
    expect(next).not.toHaveBeenCalled();
  });
});
