const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    console.log(`***** New Post : ${newPost} *******`);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          })
        )
      );
      console.log(`***** Result : ${JSON.stringify(result)} *******`);
      await newPost.addHashtags(result.map((r) => r[0]));
    }
    const fullPost = await db.Post.findOne({
      //newPost(신규추가)에다가 User의 정보를 추가해서 프론트로 갖고오려고 이렇게 하는 듯
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
        },
      ],
    });
    console.log(`***** Full Post : ${JSON.stringify(fullPost)} *******`);
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
router.post("/images", (req, res) => {});

module.exports = router;
