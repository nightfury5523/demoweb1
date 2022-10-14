const router = require("express-promise-router")();
const authorization = require("../core/authorization");

router.use("/", require("./auth"));
router.use("/posts", authorization, require("./posts"));

router.get("/500", () => {
  throw {};
});

module.exports = router;
