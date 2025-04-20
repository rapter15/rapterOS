const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const url = "https://rapter15.github.io/rapterOS/";

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/web");

const db = mongoose.connection;
db.once("open", () => {
  console.log("server ready");
});

const userSchame = new mongoose.Schema({
  name1: String,
  email: String,
  password: String,
});

const User = mongoose.model("data", userSchame);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/post", async (req, res) => {
  const { name1, email, password } = req.body;
  const user = new User({
    name1,
    email,
    password,
  });
  await user.save();
  console.log(user);
  res.send("SuccesFully compeleted");
});

app.listen(url, () => {
  console.log("Server start");
});
