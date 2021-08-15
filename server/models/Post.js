const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    hit: {
      type: String,
      required: true,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedAt: {
      type: String,
      required: true,
      default: "-",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model(`Post`, Post, `Post`);
