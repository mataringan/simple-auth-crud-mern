const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  data: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
