/* eslint-disable no-extra-boolean-cast */
const User = require("../models/User");
const Post = require("../models/Post");
const Followers = require("../models/Followers");
const Following = require("../models/Following");
const ConfirmationToken = require("../models/ConfirmationToken");
const Notification = require("../models/Notification");
const socketHandler = require("../handlers/socketHandler");
const ObjectId = require("mongoose").Types.ObjectId;
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const crypto = require("crypto");
const {
  validateEmail,
  validateFullName,
  validateUsername,
  validateBio,
  validateWebsite,
} = require("../utils/validation");
const { sendConfirmationEmail } = require("../handlers/controllerUtils");

module.exports.retrieveUser = async (req, res, next) => {};

module.exports.retrievePosts = async (req, res, next) => {};

module.exports.bookmarkPost = async (req, res, next) => {};

module.exports.followUser = async (req, res, next) => {};

module.exports.retrieveFollowing = async (req, res, next) => {};

module.exports.retrieveFollowers = async (req, res, next) => {};

module.exports.searchUsers = async (req, res, next) => {};

module.exports.confirmUser = async (req, res, next) => {};

module.exports.changeAvatar = async (req, res, next) => {};

module.exports.removeAvatar = async (req, res, next) => {};

module.exports.updateProfile = async (req, res, next) => {};

module.exports.retrieveSuggestedUsers = async (req, res, next) => {};
