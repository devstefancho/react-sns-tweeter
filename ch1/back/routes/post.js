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

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("not found comments!");
    }
    const comments = await db.Comment.findAll({
      where: { PostId: post.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/comment", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("Please Login first");
    }
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("not found Post_id");
    }
    // console.log(`${JSON.stringify(req.body)}`);
    const newComment = await db.Comment.create({
      content: req.body.content,
      UserId: req.user.id,
      PostId: req.params.id,
    });
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    return res.json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
