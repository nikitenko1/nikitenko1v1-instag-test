const mongoose = require("mongoose");

const PostVoteSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
  },
  votes: [{ author: { type: mongoose.Schema.ObjectId, ref: "User" } }],
});

const postVoteModel = mongoose.model("PostVote", PostVoteSchema);

module.exports = postVoteModel;
