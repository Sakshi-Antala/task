const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdBy : { type: Schema.Types.ObjectId, ref:"user",required: true },
    isActive : { type: Boolean, default: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  {
    timestamps: { default: Date.now() },
  }
);

module.exports = postSchema;
