const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");
const handleRoot = require("./routes/routes");
const cors = require("cors");

const app = express();
app.use(cors());

// Mongoose setup
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://mataringan:kurakura@project.g6xldrk.mongodb.net/testbinar?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(9000, () => {
      console.log("Connection Success");
    });
  })
  .catch((err) => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "Rahasia",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use("/", handleRoot);
app.use("/auth", authRoutes);
app.use("/api", dataRoutes);
