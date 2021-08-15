const express = require("express");
const routes = require("../routes");
const PostController = require("../controller/PostController");

const PostRouter = express.Router();

PostRouter.post(routes.test, PostController.test);

module.exports = PostRouter;
