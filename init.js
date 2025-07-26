// Sample data
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

let allChats = [
  {
    from: "aisha",
    to: "rohan",
    msg: "let’s meet tomorrow",
    created_at: new Date(),
  },
  {
    from: "rahul",
    to: "neha",
    msg: "did you complete the assignment?",
    created_at: new Date(),
  },
  {
    from: "sneha",
    to: "arjun",
    msg: "check your email",
    created_at: new Date(),
  },
  {
    from: "vijay",
    to: "divya",
    msg: "on my way",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
