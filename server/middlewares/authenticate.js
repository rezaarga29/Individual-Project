const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw { name: "InvalidToken" };
    }

    let accesToken = req.headers.authorization;
    let [bearer, token] = accesToken.split(" ");

    let payload = verifyToken(token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "InvalidToken" };
    }

    if (bearer !== "Bearer") {
      throw { name: "InvalidToken" };
    }
    //buat req baru yang berisikan id dari user
    req.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
