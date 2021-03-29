const crypto = require("crypto");
const User = require("../models/User");
const ConfirmationToken = require("../models/ConfirmationToken");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const {
  validateEmail,
  validateFullName,
  validateUsername,
  validatePassword,
} = require("../utils/validation");

const { sendConfirmationEmail } = require("../handlers/controllerUtils");

module.exports.verifyJwt = (token) => {};

module.exports.requireAuth = async (req, res, next) => {};

module.exports.optionalAuth = async (req, res, next) => {};

module.exports.login = async (req, res, next) => {};

module.exports.register = async (req, res, next) => {};

module.exports.changePassword = async (req, res, next) => {};
