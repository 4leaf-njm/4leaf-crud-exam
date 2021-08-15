const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;
const connect = require("./db");
const PostRouter = require("./router/PostRouter");
const routes = require("./routes");

app.use(cors());

connect();

app.use(bodyParser.json());

app.post(routes.getPostList, PostRouter);
app.post(routes.getPostDetail, PostRouter);
app.post(routes.createPost, PostRouter);
app.post(routes.updatePost, PostRouter);
app.post(routes.deletePost, PostRouter);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
