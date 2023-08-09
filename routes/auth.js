const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { password } = req.body;

  // Simpan angka apa pun sebagai password, tanpa validasi format
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  // Cari pengguna berdasarkan password
  let user = await User.findOne({ password });

  if (!user) {
    // Jika pengguna tidak ditemukan, buat pengguna baru
    user = await User.create({ password });
  }

  const token = jwt.sign({ userId: user._id }, "Rahasia");

  res.json({ message: "Login successful", token });
});

module.exports = router;
