const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  message: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
  },
});

CommentSchema.pre("deleteOne", async function (next) {
  // query.find({ a: 1 }).where('b').gt(2);
  // query.getQuery(); // { a: 1, b: { $gt: 2 } }
  const commentId = this.getQuery()["_id"];
  try {
    await mongoose.model("CommentVote").deleteOne({ comment: commentId });
    await mongoose
      .model("CommentReply")
      .deleteMany({ parentComment: commentId });
  } catch (err) {
    next(err);
  }
});

CommentSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      await mongoose.model("CommentVote").create({ comment: this._id });
      next();
    } catch (err) {
      next(err);
    }
  }
  next();
});

const commentModel = mongoose.model("Comment", CommentSchema);
module.exports = commentModel;
