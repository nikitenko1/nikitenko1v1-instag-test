const cloudinary = require("cloudinary").v2;
const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
const Post = require("../models/Post");
const PostVote = require("../models/PostVote");
const Following = require("../models/Following");
const Followers = require("../models/Followers");
const Notification = require("../models/Notification");
const socketHandler = require("../handlers/socketHandler");
const fs = require("fs");
const ObjectId = require("mongoose").Types.ObjectId;

const {
  retrieveComments,
  formatCloudinaryUrl,
  populatePostsPipeline,
} = require("../handlers/controllerUtils");
const filters = require("../utils/imageFilters");

module.exports.createPost = async (req, res, next) => {};

module.exports.deletePost = async (req, res, next) => {};

module.exports.retrievePost = async (req, res, next) => {};

module.exports.votePost = async (req, res, next) => {};

module.exports.retrievePostFeed = async (req, res, next) => {};

module.exports.retrieveSuggestedPosts = async (req, res, next) => {};

module.exports.retrieveHashtagPosts = async (req, res, next) => {};
