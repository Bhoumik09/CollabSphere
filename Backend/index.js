const express=require('express');
const app=express();
const multer=require('multer');
const cors=require('cors');
const passport = require('passport');
const session = require('express-session');
const authRoutes=require('./routes/auth');
const mongoose=require('mongoose');
const leaderRoutes=require('./routes/leaderBoard')
const feedbackRoutes=require('./routes/feedback')
const userCreateRoutes=require('./routes/user');
const communityRoutes=require('./routes/Comm');
let projectRoutes=require('./routes/project');
const bodyParser=require('body-parser');
const User = require('./models/User');
const createCommunities = require('./seed');
mongoose.connect('mongodb://127.0.0.1:27017/discord');
// createCommunities()
const GoogleStrategy = require("passport-google-oauth20").Strategy;
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
const GOOGLE_CLIENT_ID = "932573291552-iioiqebr3neqgp23df7g4a0feh73en0k.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        done(null, profile);
      }
    )
  );
  app.use(passport.initialize());
app.use(passport.session());
function checkEmail(email){

}
  passport.serializeUser((user, done) => {
    // console.log(user)
    done(null, user);
    
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(authRoutes);
app.use(feedbackRoutes);
app.use(userCreateRoutes);
app.use(leaderRoutes);
app.use(projectRoutes);
app.use(communityRoutes);
// createCommunities();
app.listen(8000);