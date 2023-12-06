const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String,required: true, unique: true},
    mobileNumber: { type: String, unique: true },
  },
  {
    timestamps: { default: Date.now() },
  }
);

module.exports = userSchema;
