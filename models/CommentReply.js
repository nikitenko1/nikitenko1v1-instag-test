const mongoose = require("mongoose");

const CommentReplySchema = new mongoose.Schema({
  parentComment: {
    type: mongoose.Schema.ObjectId,
    ref: "Comment",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  message: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

CommentReplySchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      await mongoose.model("CommentReplyVote").create({ comment: this._id });
      next();
    } catch (err) {
      return next(err);
    }
  }
});

CommentReplySchema.pre("deleteOne", async function (next) {
  const commentReplyId = this.getQuery()["_id"];
  try {
    await mongoose
      .model("CommentReplyVote")
      .deleteOne({ comment: commentReplyId });
    next();
  } catch (err) {
    return next(err);
  }
});

CommentReplySchema.pre("deleteMany", async function (next) {
  const parentCommentId = this.getQuery()["parentComment"];

  try {
    const commentReply = await mongoose
      .model("CommentReply")
      .findOne({ parentComment: parentCommentId });
    if (commentReply) {
      await mongoose
        .model("CommentReplyVote")
        .deleteOne({ comment: commentReply._id });
    }
    next();
  } catch (err) {
    return next(err);
  }
});

const commentReplyModel = mongoose.model("CommentReply", CommentReplySchema);
module.exports = commentReplyModel;
