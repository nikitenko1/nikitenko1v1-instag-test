const router = require("express").Router();
const multer = require("multer");
const {
  retrieveUser,
  retrievePosts,
  bookmarkPost,
  followUser,
  retrieveFollowing,
  retrieveFollowers,
  searchUsers,
  confirmUser,
  changeAvatar,
  removeAvatar,
  updateProfile,
  retrieveSuggestedUsers,
} = require("../controllers/user");
const { requireAuth, optionalAuth } = require("../controllers/auth");

router.get("/suggested/:max?", requireAuth, retrieveSuggestedUsers);
router.get("/:username", optionalAuth, retrieveUser);
router.get("/:username/posts/:offset", retrievePosts);
router.get("/:userId/:offset/following", requireAuth, retrieveFollowing);
router.get("/:userId/:offset/followers", requireAuth, retrieveFollowers);
router.get("/:username/:offset/search", searchUsers);

router.put("/confirm", requireAuth, confirmUser);
router.put(
  "/avatar",
  requireAuth,
  multer({
    dest: "temp/",
    limits: { fieldSize: 8 * 1024 * 1024, fileSize: 1000000 },
  }).single("image"),
  changeAvatar
);
router.put("/", requireAuth, updateProfile);
router.delete("/avatar", requireAuth, removeAvatar);

router.post("/:postId/bookmark", requireAuth, bookmarkPost);
router.post("/:userId/follow", requireAuth, followUser);

module.exports = router;
