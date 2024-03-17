let express=require('express');
const Project = require('../models/Project');
let router=express.Router();
router.get('/projects',async(req,res)=>{
    let projects=await Project.find({status:true}).populate(['skills','contributors']);
    res.send(200).json(projects);
})
router.get('/project/:id',async(req,res)=>{
    let projects=await Project.find().populate(['skills','contributors']);
    res.send(200).json(projects);
})

module.exports=router;