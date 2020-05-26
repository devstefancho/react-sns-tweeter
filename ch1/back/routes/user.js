const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/", (req, res) => {
  if (!req.user) {
    return res.status(401).send("Please Login again");
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});
router.post("/", async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send("Already exist!");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      userId: req.body.userId,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    return next(e);
  }
});
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Logout Success!!");
  console.log("logout success");
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
              as: "Posts",
              attribute: ["id"],
            },
            {
              model: db.User,
              as: "Followings",
              attribute: ["id"],
            },
            {
              model: db.User,
              as: "Followers",
              attribute: ["id"],
            },
          ],
          attribute: ["id", "nickname", "userId"],
        });
        console.log(fullUser);
        console.log("login success", req.user);
        return res.json(fullUser);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});
router.get("/:id/", async (req, res, next) => {
  try {
    const userInfo = await db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Post,
          as: "Posts",
          attribute: ["id"],
        },
        {
          model: db.User,
          as: "Followings",
          attribute: ["id"],
        },
        {
          model: db.User,
          as: "Followers",
          attribute: ["id"],
        },
      ],
      attribute: ["id", "nickname", "userId"],
      order: [["createdAt", "DESC"]],
    });
    const jsonUser = userInfo.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.get("/:id/follow", (req, res) => {});
router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});
router.delete("/:id/follower", (req, res) => {});
router.get("/:id/posts", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: { UserId: parseInt(req.params.id, 10), RetweetId: null },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Image,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
