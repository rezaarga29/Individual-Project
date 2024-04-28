const router = require("express").Router();
const WatchlistController = require("../controllers/WatchlistController");
const authentication = require("../middlewares/authenticate");
const { authorization } = require("../middlewares/authorization");

router.post("/comic", authentication, WatchlistController.postWatchlist);
router.get("/comic", authentication, WatchlistController.getWathlistUserId);
router.put(
  "/comic/:id",
  authentication,
  authorization,
  WatchlistController.putWatchlistById
);
router.get(
  "/comic/:id",
  authentication,
  authorization,
  WatchlistController.getWatchlistById
);
router.delete(
  "/comic/:id",
  authentication,
  authorization,
  WatchlistController.deleteWatchlistById
);

module.exports = router;
