const router = require("express-promise-router")();
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
} = require("./posts.controller");

router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.post("/", createPost);

module.exports = router;
