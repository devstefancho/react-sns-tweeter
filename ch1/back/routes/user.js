const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {});
router.post("/", (req, res) => {});
router.get("/:id", (req, res) => {});
router.post("/logout", (req, res) => {});
router.post("/login", (req, res) => {});
router.get("/:id/follow", (req, res) => {});
router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});
router.delete("/:id/follower", (req, res) => {});
router.get("/:id/post", (req, res) => {});

module.exports = router;
