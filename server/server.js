const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;
const connect = require("./db");
const PostRouter = require("./router/PostRouter");

app.use(cors());

connect();

app.use(bodyParser.json());

app.post(routes.test, PostRouter);

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
