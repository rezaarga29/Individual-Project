const { Watchlist, User } = require("../models");

const authorization = async (req, res, next) => {
  try {
    let wathclist = await Watchlist.findByPk(req.params.id);
    let user = await User.findByPk(req.user.id);
    if (!wathclist) {
      throw { name: "InvalidInput" };
    }
    //! id yang membedakan admin dan staff
    if (user.role == "admin") {
      next();
    } else if (wathclist.UserId !== req.user.id) {
      throw { name: "Forbidden" };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const authorizationAdmin = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.user.id);

    if (user.role === "admin") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization, authorizationAdmin };
