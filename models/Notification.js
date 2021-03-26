const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  notificationType: {
    type: String,
    enum: ["follow", "like", "comment", "mention"],
  },
  date: Date,
  notificationData: Object,
  read: {
    type: Boolean,
    default: false,
  },
});

const notificationModel = mongoose.model("notification", NotificationSchema);
module.exports = notificationModel;
