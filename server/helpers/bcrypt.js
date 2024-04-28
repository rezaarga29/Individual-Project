const { hashSync, compareSync } = require("bcryptjs");

const hashPassword = (password) => {
  let hash = hashSync(password);
  return hash;
};

const comparePassword = (inputPassword, passwordDB) => {
  let compare = compareSync(inputPassword, passwordDB);
  return compare;
};

module.exports = { hashPassword, comparePassword };
