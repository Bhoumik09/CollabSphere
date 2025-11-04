const express=require('express');
const app=express();
const dotenv = require('dotenv');
dotenv.config();

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
const { MongoClient, ServerApiVersion } = require('mongodb');
const MongoStore = require('connect-mongo');
try{
  mongoose.connect(process.env.MONGODB);
 console.log('connected')
}
catch(e){
  console.log(e.message);
}
 // createCommunities(); 

const GoogleStrategy = require("passport-google-oauth20").Strategy;
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${backendUrl}/auth/google/callback`,
      scope: ["profile", "email"],
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
  app.use(passport.initialize());
app.use(session({
    // 2. Use a real secret from your .env file
     secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    // 3. Tell session to use connect-mongo
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB,
        ttl: 14 * 24 * 60 * 60 // = 14 days. Sessions will auto-delete after 2 weeks
    })
}));
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
    cors({origin:process.env.FRONTEND_URL ||'http://localhost:5173',credentials:true})
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
app.get('/',(req,res)=>{
    res.send("Welcome to CollabSphere Backend");
});
if(process.env.NODE_ENV!=="production"){
  app.listen(process.env.PORT||8000);
}
module.exports=app;
