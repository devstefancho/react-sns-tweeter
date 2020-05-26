const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:tag", async (req, res, next) => {
  try {
    console.log("********************");
    console.log(req.params.tag);
    console.log(decodeURIComponent(req.params.tag));
    console.log("********************");
    const hashtagPosts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) },
        },
        {
          model: db.User,
          attributes: ["id", "nickname", "userId"],
        },
        {
          model: db.Image,
        },
      ],
    });
    res.json(hashtagPosts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
