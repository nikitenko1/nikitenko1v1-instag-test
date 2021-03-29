const Comment = require("../models/Comment");
const CommentVote = require("../models/CommentVote");
const CommentReply = require("../models/CommentReply");
const CommentReplyVote = require("../models/CommentReplyVote");
const Post = require("../models/Post");
const ObjectId = require("mongoose").Types.ObjectId;

const {
  retrieveComments,
  formatCloudinaryUrl,
  sendCommentNotification,
  sendMentionNotification,
} = require("../handlers/controllerUtils");

module.exports.createComment = async (req, res, next) => {};

module.exports.deleteComment = async (req, res, next) => {};

module.exports.voteComment = async (req, res, next) => {};

module.exports.createCommentReply = async (req, res, next) => {};

module.exports.deleteCommentReply = async (req, res, next) => {};

module.exports.voteCommentReply = async (req, res, next) => {};

module.exports.retrieveCommentReplies = async (req, res, next) => {};

module.exports.retrieveComments = async (req, res, next) => {};
