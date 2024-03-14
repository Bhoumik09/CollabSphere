    let mongoose=require('mongoose');
    let express=require('express');
    const User = require('../models/User');
    const Feedback = require('../models/feedback');
    let router=express.Router();
    router.post  ('/feedback',async(req,res)=>{
        try{
            await Feedback.create(req.body);
            res.status(201).json({msg:"Feedback Submitted"});
        }
        catch(e){
            res.status(401).json({msg:"An unknown Error occured"});
        }
        
    })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    module.exports=router;