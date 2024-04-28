const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use(require("./user"));
router.use(require("./watchlist"));

module.exports = router;
