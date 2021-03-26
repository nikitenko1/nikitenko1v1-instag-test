const mongoose = require("mongoose");

const FollowingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  following: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
});

const followingModel = mongoose.model("Following", FollowingSchema);
module.exports = followingModel;
