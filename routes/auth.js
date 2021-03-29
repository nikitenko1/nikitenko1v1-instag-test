const router = require("express").Router();
const {
  login,
  register,
  requireAuth,
  changePassword,
} = require("../controllers/auth");

router.post("/login", login);
router.post("/register", register);
router.put("/password", requireAuth, changePassword);

module.exports = router;
