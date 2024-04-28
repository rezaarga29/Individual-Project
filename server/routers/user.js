const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authenticate");
const { authorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.post("/register", UserController.postRegisterUser);
router.post("/login", UserController.postLogin);
router.post("/google-login", UserController.googleLogin);
router.post(
  "/generate-midtrans",
  authentication,
  UserController.postGenerateMidtrans
);

module.exports = router;
