const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");

const app = express();

db.sequelize.sync();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);

app.listen(3065, () => {
  console.log("server is running on http://localhost:3065");
});
