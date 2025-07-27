const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

const app = express();
const port = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

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

// app.get("/", (req, res) => {
//   res.send("/ working");
// });

// Index route

app.get("/", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/new", async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = await Chat.create({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat.save().catch((err) => {
    console.log("db error");
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
