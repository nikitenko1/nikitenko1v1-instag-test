const mongoose = require("mongoose");

const ConfirmationTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  token: String,
});

const confirmationTokenModel = mongoose.model(
  "ConfirmationToken",
  ConfirmationTokenSchema
);
module.exports = confirmationTokenModel;
