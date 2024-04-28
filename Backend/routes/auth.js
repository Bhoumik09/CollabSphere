const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const CLIENT_URL = "http://localhost:5173/";

async function getId(email) {
  try {
    if (email === undefined) return -1;
    const user = await User.findOne({ email: email });
    return user._id;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return -1;
  }
}

// Function to check if email exists in the database
const checkEmail = async (email) => {
  try {
    if (email === undefined) return false;
    console.log(email);
    const user = await User.findOne({ email: email });
    return !!user; // Returns true if user exists, false otherwise
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:5173',
  failureRedirect: '/auth/login/failed'
}));

router.get('/auth/login/success', async (req, res) => {
  try {
    if (req.user) {
      const email = req.user.emails[0].value;
      const profileExists = await checkEmail(email);
      const id = await getId(email);
      res.status(200).json({
        success: true,
        message: "successful",
        user: req.user,
        profileExists,
        id
      });
    }
  } catch (error) {
    console.error("Error handling login success:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
    res.redirect(CLIENT_URL);
  });
});

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({ success: false, message: "failure" });
});

module.exports = router;