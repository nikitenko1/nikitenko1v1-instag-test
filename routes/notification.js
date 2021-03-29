const router = require("express").Router();
const {
  retrieveNotifications,
  readNotifications,
} = require("../controllers/notification");
const { requireAuth } = require("../controllers/auth");

router.get("/", requireAuth, retrieveNotifications);

router.put("/", requireAuth, readNotifications);

module.exports = router;
