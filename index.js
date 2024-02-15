const express=require('express');
const app=express();
const path=require('path');
const passport=require('passport');
const session=require('express-session');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {checkAuthenticated}=require('./middleware')
app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))
console.log(__dirname)

app.use (passport.initialize());
app.use (passport.session());
const GOOGLE_CLIENT_ID = "932573291552-11cs6icocjsd009svu3u396js4v284nh.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback   : true
}, authUser));

passport.serializeUser( (user, done) => { 
    console.log(`\n--------> Serialize User:`);
    console.log(user);
     // The USER object is the "authenticated user" from the done() in authUser function.
     // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  
    done(null, user);
} )
passport.deserializeUser((user, done) => {
    console.log("\n--------- Deserialized User:")
    console.log(user)
    // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
    // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

    done (null, user)
}) 
app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'views'))
const PORT=3001;
app.listen(PORT,()=>{
    console.log("Connected at port");
})

let count = 1
showlogs = (req, res, next) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)
  
    console.log(`\n req.user -------> `) 
    // console.log(req.user)
    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`) 
    console.log(`req.session.cookie -------> `) 
    console.log(req.session.cookie) 
  
    console.log("===========================================\n")

    next()
}
app.use(showlogs)
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
}));
app.get("/login", (req, res) => {
    res.render("login");
}) 
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
}) 

app.post("/logout", (req,res) => {
    req.logOut(function(err){
        if(err){
            return next(err);
        }
    })
    res.redirect("/login")
    console.log(`-------> User Logged out`)
})