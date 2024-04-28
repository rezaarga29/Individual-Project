"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Watchlist);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email already exists",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: `email is required`,
          },
          notNull: {
            args: true,
            msg: `email cannot be null`,
          },
          isEmail: {
            args: true,
            msg: `invalid email format`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `password is required`,
          },
          notNull: {
            msg: `password cannot be null`,
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
          user.role = "user";
        },
      },
    }
  );
  return User;
};
