const mongoose = require("mongoose");
const User = require("../models/User");
const Skill = require("../models/Skill");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { json } = require("body-parser");

let givenHash = [];

let findRank = async (id) => {
  try {
    let users = await User.find({});
    let arr = users.map((value, index) => {
      return { coins: value.coins, id: value._id };
    });
    console.log(arr);
    arr.sort((a, b) => {
      // Sort in descending order based on coins
      return a.coins - b.coins;
    });
    let index = arr.findIndex(user => user.id.toString() === id.toString());
    return index + 1;
  } catch (error) {
    console.error('Error finding rank:', error);
    throw error;
  }
};

function generateRandomNumber() {
  let num = Math.floor(Math.random() * 100000);
  if (givenHash.includes(num)) {
    return generateRandomNumber();
  } else {
    givenHash.push(num);
    return num;
  }
}

function generateUniqueUsername(name, reg) {
  let temp = "";
  for (let n of name) {
    temp += n;
  }
  temp += "#";
  temp += reg.toLowerCase().length > 0 ? reg : generateRandomNumber();
  console.log(temp);
  return temp;
}

const upload = multer({ dest: "uploads/" });

router.post("/new/profile", upload.single("img"), async (req, res) => {
  try {
    let { name, email, github, linkedin, skills, reg } = req.body;
    let username = JSON.parse(name);
    let skillNames = JSON.parse(skills);
    username = generateUniqueUsername(username, reg);
    let savedSkills = await Promise.all(
      skillNames.map(async (name) => {
        let skill = new Skill({ name });
        return await skill.save();
      })
    );
    let userArr = username.split("#");
    let user = new User({
      name: username,
      email,
      github,
      linkedin,
      coins: 0,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      skills: savedSkills.map((skill) => skill._id),
      regNo: userArr[1]
    });
    await user.save();
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id).populate("skills");
    let rank = await findRank(id);
    console.log(rank);
    res.status(201).json({ user, rank });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id).populate("skills");
    res.status(201).json(user);
  } catch (error) {
    console.error("Error fetching user for editing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/find/user", async (req, res) => {
  const search = req.query.search.toLowerCase();
  try {
    // Use the $regex operator to perform a case-insensitive search
    const regex = new RegExp(search, 'i');
    const users = await User.find({ regNo: { $regex: regex } });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;