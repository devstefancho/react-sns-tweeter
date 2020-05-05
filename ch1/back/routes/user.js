const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/", (req, res) => {});
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
router.get("/:id", (req, res) => {});
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Logout Success!!");
  console.log("logout success");
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    try {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        console.log("login success", req.user);
        const filteredUser = Object.assign({}, user.toJSON());
        delete filteredUser.password;
        return res.json(filteredUser);
      });
    } catch (e) {
      next(e);
    }
  })(req, res, next);
});
router.get("/:id/follow", (req, res) => {});
router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});
router.delete("/:id/follower", (req, res) => {});
router.get("/:id/post", (req, res) => {});

module.exports = router;
