const generateAccountNumber = () => {
  const timestamp = Date.now().toString();
  const randomNumber = Math.floor(Math.random() * 10000);
  const uniquePart = timestamp.slice(-6);
  const accountNumber = `${uniquePart}${randomNumber.toString().padStart(8, "0")}`;
  return accountNumber;
};

module.exports = generateAccountNumber;
