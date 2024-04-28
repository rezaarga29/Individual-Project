const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const midtransClient = require("midtrans-client");
class UserController {
  static async postRegisterUser(req, res, next) {
    try {
      let { email, password } = req.body;
      let newUser = await User.create({
        email,
        password,
      });
      // Destructuring newUser tanpa menyertakan password
      let { password: userPassword, ...userWithoutPassword } = newUser.toJSON();
      res.status(201).json({ newUser: userWithoutPassword });
    } catch (error) {
      next(error);
    }
  }

  static async postLogin(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: "EmptyInput" };
      }

      let user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "InvalidUser" };
      }

      let compare = comparePassword(password, user.password);
      if (!compare) {
        throw { name: "InvalidUser" };
      }

      let token = createToken({
        id: user.id,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      // console.log(google_token);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience:
          "681137735030-g56nbddcj4g8f58ij68u2hrt96fctgia.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: String(Math.random() * 10000),
        },
      });
      let token = createToken({
        id: user.id,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async postGenerateMidtrans(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id: "TX-ID" + Math.floor(1000000 + Math.random() * 123123123),
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };
      const midTransToken = await snap.createTransaction(parameter);
      res.status(201).json(midTransToken);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
