const express = require("express");
const jwt = require("jsonwebtoken");
const Data = require("../models/data");
const User = require("../models/user");

const router = express.Router();

router.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, "Rahasia", async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.currentUser = user;
    next();
  });
});

router.get("/data", async (req, res) => {
  const data = await Data.find({ userId: req.userId });

  res.json(data);
});

router.get("/data/:id", async (req, res) => {
  const dataId = req.params.id;

  const data = await Data.findOne({ _id: dataId, userId: req.userId });

  if (!data) {
    return res.status(404).json({ message: "Data not found" });
  }

  res.json(data);
});

router.post("/data", async (req, res) => {
  const { title, content } = req.body;

  const newData = await Data.create({ userId: req.userId, title, content });

  req.currentUser.data.push(newData);
  await req.currentUser.save();

  res.json(newData);
});

router.put("/data/:id", async (req, res) => {
  const { title, content } = req.body;
  const dataId = req.params.id;

  const data = await Data.findOne({ _id: dataId, userId: req.userId });

  if (!data) {
    return res.status(404).json({ message: "Data not found" });
  }

  data.title = title;
  data.content = content;
  await data.save();

  res.json(data);
});

router.delete("/data/:id", async (req, res) => {
  const dataId = req.params.id;

  const data = await Data.findOne({ _id: dataId, userId: req.userId });

  if (!data) {
    return res.status(404).json({ message: "Data not found" });
  }

  await data.deleteOne();

  res.json({ message: "Data deleted" });
});

module.exports = router;
