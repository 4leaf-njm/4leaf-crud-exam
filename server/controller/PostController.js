const Post = require("../models/Post");

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

const deletePost = async (req, res) => {
  const {
    body: { id },
  } = req;

  let result = false;

  try {
    await Post.updateOne(
      {
        _id: id,
      },
      {
        isDelete: true,
      }
    );

    result = true;
  } catch (e) {
    console.log(e);
  }

  return res.json({ result });
};

const PostController = { getPostList, getPostDetail, deletePost };

module.exports = PostController;
