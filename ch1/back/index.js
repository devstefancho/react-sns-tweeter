const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const helmet = require("helmet");
const hpp = require("hpp");

const passportConfig = require("./passport");
const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const hashtagAPIRouter = require("./routes/hashtag");
const { frontUrl } = require("../front/config/config");
const prod = process.env.NODE_ENV === "production";

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

if (prod) {
  app.use(hpp());
  app.use(morgan("combined"));
  app.use(helmet());
  app.use(
    cors({
      origin: "http://stefancho.gq",
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.use("/", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: prod && ".stefancho.gq", // {frontUrl}
    },
    name: "rnbck11",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("backend server is now running on PORT:80");
});

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);
app.use("/api/hashtag", hashtagAPIRouter);

app.listen(prod ? process.env.PORT : 3065, () => {
  console.log(
    "server is running on ",
    prod ? `${process.env.PORT}` : "http://localhost:3065"
  );
});
