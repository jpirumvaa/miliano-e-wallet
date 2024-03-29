import generateAccountNumber from "../src/utils/generateAccountNumber";

describe("generateAccountNumber", () => {
  it("should return a string", () => {
    const accountNumber = generateAccountNumber();
    expect(typeof accountNumber).toBe("string");
  });

  it("should have a length of 14 characters", () => {
    const accountNumber = generateAccountNumber();
    expect(accountNumber.length).toBe(14);
  });

  it("should start with a 6-digit timestamp", () => {
    const accountNumber = generateAccountNumber();
    const timestamp = Date.now().toString();
    const timestampPart = accountNumber.slice(0, 6);
    expect(timestampPart).toBe(timestamp.slice(-6));
  });

  it("should end with an 8-digit random number", () => {
    const accountNumber = generateAccountNumber();
    const randomNumberPart = accountNumber.slice(-8);
    expect(randomNumberPart).toMatch(/^\d{8}$/);
  });
});
