const mongoose = require("mongoose");

const CommentVoteSchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.ObjectId,
    ref: "Comment",
  },
  votes: [
    {
      author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
});

const commentVoteModel = mongoose.model("CommentVote", CommentVoteSchema);
module.exports = commentVoteModel;
