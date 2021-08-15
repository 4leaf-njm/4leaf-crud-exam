const Post = require("../models/Post");

const test = async (req, res) => {
  const result = await Post.find();

  return res.json({ data: result });
};

const PostController = { test };

module.exports = PostController;
