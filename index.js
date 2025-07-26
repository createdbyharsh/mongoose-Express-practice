const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

const app = express();
const port = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp"); // whatsapp databse
}

main()
  .then((res) => {
    console.log("connected to whatsapp database");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("/ working");
});

// Index route

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs", { chats });
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
