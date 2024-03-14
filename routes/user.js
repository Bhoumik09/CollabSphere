let mongoose=require('mongoose');
let express=require('express');
const User = require('../models/User');
const AI = require('../models/Ai');
const APP = require('../models/AppDev');
const ML = require('../models/Ml');
const multer=require('multer');
const Mern = require('../models/Mern');
const UI = require('../models/UI');
const Edit = require('../models/Editing');
let router=express.Router();
let upload=multer({ dest: 'uploads/' });

router.post('/new/profile',upload.single('img'),async(req,res)=>{
     let {name,email,github,linkedin,skills}=req.body;
     
     let user=new User({name,email,github,linkedin,coins:0,img: {
          data: req.file.buffer,
          contentType: req.file.mimetype
      }});
     await user.save();
     let s=JSON.parse(skills);
     console.log(s);
     for(let skill of s){
          if(skill==='AI')await AI.create({author:user});
          else if(skill==='APP')await APP.create({author:user});
          else if(skill==='UI/UX')await UI.create(user);
          else if(skill==='Editing') await Edit.create(user);
          else if(skill==='ML') await ML.create({author:user});
          else if(skill==='MERN')await Mern.create({author:user});
     }
     res.status(201).json({msg:"user created"})

     
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
module.exports=router;