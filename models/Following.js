const mongoose = require("mongoose");

const FollowersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  followers: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
});

const followersModel = mongoose.model("Followers", FollowersSchema);
module.exports = followersModel;
