const Post = require("../models/Post");
const { CURRENT_TIME } = require("../commonUtils");

const getPostList = async (req, res) => {
  const {
    body: { searchValue, sort },
  } = req;

  let sortData = {};

  if (sort === "1") {
    sortData.createdAt = -1;
  } else if (sort === "2") {
    sortData.createdAt = 1;
  }

  let result = null;

  try {
    result = await Post.find({
      isDelete: false,
      title: { $regex: `.*${searchValue}.*` },
    }).sort(sortData);
  } catch (e) {
    console.log(e);
  }

  return res.json({ result });
};

const getPostDetail = async (req, res) => {
  const {
    body: { id },
  } = req;

  let result = null;

  try {
    result = await Post.findOne({
      _id: id,
    });

    result.hit = result.hit + 1;
    result.save();
  } catch (e) {
    console.log(e);
  }

  return res.json({ result });
};

const createPost = async (req, res) => {
  const {
    body: { title, author, content },
  } = req;

  let result = false;

  try {
    const currentTime = await CURRENT_TIME();

    await Post.create({
      title,
      author,
      content,
      createdAt: currentTime,
      updatedAt: currentTime,
    });

    result = true;
  } catch (e) {
    console.log(e);
  }

  return res.json({ result });
};

const updatePost = async (req, res) => {
  const {
    body: { id, title, author, content },
  } = req;

  let result = false;

  try {
    const currentTime = await CURRENT_TIME();

    await Post.updateOne(
      {
        _id: id,
      },
      {
        title,
        author,
        content,
        updatedAt: currentTime,
      }
    );

    result = true;
  } catch (e) {
    console.log(e);
  }

  return res.json({ result });
};

const deletePost = async (req, res) => {
  const {
    body: { id },
  } = req;

  let result = false;

  try {
    const currentTime = await CURRENT_TIME();

    await Post.updateOne(
      {
        _id: id,
      },
      {
        isDelete: true,
        deletedAt: currentTime,
      }
    );

    result = true;
  } catch (e) {
    console.log(e);
  }

  return res.json({ result });
};

const PostController = {
  getPostList,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
};

module.exports = PostController;
