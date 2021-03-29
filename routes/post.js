const router = require("express").Router();
const multer = require("multer");
const upload = multer({
  dest: "temp/",
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("image");
const rateLimit = require("express-rate-limit");

const { requireAuth } = require("../controllers/auth");
const {
  createPost,
  retrievePost,
  votePost,
  deletePost,
  retrievePostFeed,
  retrieveSuggestedPosts,
  retrieveHashtagPosts,
} = require("../controllers/post");
const filters = require("../utils/imageFilters");

const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

router.post("/", postLimiter, requireAuth, upload, createPost);
router.post("/:postId/vote", requireAuth, votePost);
router.get("/suggested/:offset", requireAuth, retrieveSuggestedPosts);
router.get("/filters", (req, res) => {
  res.send({ filters });
});
router.get("/:postId", retrievePost);
router.get("/feed/:offset", requireAuth, retrievePostFeed);
router.get("/hashtag/:hashtag/:offset", requireAuth, retrieveHashtagPosts);
router.delete("/:postId", requireAuth, deletePost);

module.exports = router;
