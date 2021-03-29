const router = require("express").Router();
const { requireAuth } = require("../controllers/auth");
const {
  createComment,
  deleteComment,
  voteComment,
  createCommentReply,
  deleteCommentReply,
  voteCommentReply,
  retrieveCommentReplies,
  retrieveComments,
} = require("../controllers/comment");

router.post("/:postId", requireAuth, createComment);
router.post("/:commentId/vote", requireAuth, voteComment);
router.post("/:commentReplyId/replyVote", requireAuth, voteCommentReply);
router.post("/:parentCommentId/reply", requireAuth, createCommentReply);

router.get("/:parentCommentId/:offset/replies", retrieveCommentReplies);
router.get("/:postId/:offset/:exclude", retrieveComments);

router.delete("/:commentId", requireAuth, deleteComment);
router.delete("/:commentReplyId/reply", requireAuth, deleteCommentReply);

module.exports = router;
