const express = require("express");
const routes = require("../routes");
const PostController = require("../controller/PostController");

const PostRouter = express.Router();

PostRouter.post(routes.getPostList, PostController.getPostList);
PostRouter.post(routes.getPostDetail, PostController.getPostDetail);
PostRouter.post(routes.deletePost, PostController.deletePost);

module.exports = PostRouter;
