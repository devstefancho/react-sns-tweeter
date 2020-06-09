const express = require("express");
const path = require("path");
const multer = require("multer");

const db = require("../models");
const { isLoggedIn } = require("./middleware");

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads"); //cb는 done과 같은 것
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post("/", upload.none(), async (req, res, next) => {
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
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => {
            return db.Image.create({ src: image });
          })
        );
        await newPost.addImages(images);
      } else {
        const image = await db.Image.create({ src: req.body.image });
        await newPost.addImage(image);
      }
    }
    const fullPost = await db.Post.findOne({
      //newPost(신규추가)에다가 User의 정보를 추가해서 프론트로 갖고오려고 이렇게 하는 듯
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
          attribute: ["id", "nickname"],
        },
        {
          model: db.Image,
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"],
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
//setup multer

router.post("/images", upload.array("image"), (req, res, next) => {
  try {
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
  } catch (e) {
    console.error(e);
    next(e);
  }
});

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

router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
  try {
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
//Like && Unlike Post
router.post("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
    });
    if (!post) {
      res.status(404).send("Not Found Post!");
    } else {
      await post.addLiker(req.user.id);
      res.json({ userId: req.user.id });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
    });
    if (!post) {
      res.status(404).send("Not Found Post!");
    } else {
      await post.removeLiker(req.user.id);
      res.json({ userId: req.user.id });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/:id/retweet", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Post,
          as: "Retweet",
        },
      ],
    });
    if (!post) {
      return res.status(404).send("Not existing Post");
    }
    if (
      req.user.id === post.UserId ||
      (post.Retweet && post.Retweet.UserId === req.user.id)
    ) {
      return res.status(403).send("can't not retweet yourself");
    }
    const retweetTargetId = post.RetweetId || post.id;
    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send("already Retweet post");
    }
    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: "retweet",
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"],
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"],
            },
            {
              model: db.Image,
            },
          ],
        },
      ],
    });
    res.json(retweetWithPrevPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
