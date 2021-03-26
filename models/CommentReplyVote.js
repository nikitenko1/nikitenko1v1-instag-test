const mongoose = require("mongoose");

const CommentReplyVoteSchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.ObjectId,
    ref: "CommentReply",
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

const commentReplyVoteModel = mongoose.model(
  "CommentReplyVote",
  CommentReplyVoteSchema
);
module.exports = commentReplyVoteModel;
