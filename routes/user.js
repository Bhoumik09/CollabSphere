const mongoose = require('mongoose');
const User = require('../models/User');
const Skill = require('../models/Skill');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { json } = require('body-parser');
const uniqueUsernames = new Set();
let givenHash=[];
function generateRandomNumber(){
    let num=Math.floor(Math.random()*(100000));
    if(givenHash.includes(num)){
        return generateRandomNumber();
    }else{
        givenHash.push(num);
        return num;
    }
}
function generateUniqueUsername(name) {
        
        let temp="";
        for(let n of name){
            temp+=n;
        }
        temp+='#';
        temp+=generateRandomNumber();
        console.log(temp);
        return temp;
}

const upload = multer({ dest: 'uploads/' });

router.post('/new/profile', upload.single('img'), async (req, res) => {
    try {
        let { name, email, github, linkedin, skills } = req.body;
        let username=JSON.parse(name);
        let skillNames = JSON.parse(skills);
        username=generateUniqueUsername(username);
        let savedSkills = await Promise.all(skillNames.map(async (name) => {
            let skill = new Skill({ name });
            return await skill.save();
        }));
        // Create user
        let user = new User({
            name:username,
            email,
            github,
            linkedin,
            coins: 0,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            skills: savedSkills.map(skill => skill._id),
            
        });

        await user.save();

        res.status(201).json({ msg: "User created" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/user/:id',async(req,res)=>{
        let {id}=req.params;
        let user=await User.findById(id).populate('skills');
        res.status(201).json(user);
})
router.get('/user/:id/edit',async(req,res)=>{
    let {id}=req.params;
    let user=await User.findById(id).populate('skills');
    res.status(201).json(user);
})
router.patch('/user/:id/edit',async(req,res)=>{
    let {id}=req.params;
    let user=await User.findById(id);
    while(user.skills.length){
        await Skill.findByIdAndDelete(user.skills);
        user.skills.pop();
    }
    let { name, email, github, linkedin, skills } = req.body;
    let skillNames = JSON.parse(skills);
    let skillArr=await Promise.all(skillNames.map(async(index)=>{
        let s=new Skill({
            name:index
        })
        return await s.save();
    }))
    await User.findByIdAndUpdate(id,{skills:skillArr,linkedin,github}); 
})
router.get('/find/user',(req,res)=>{
    const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/find/user', async (req, res) => {
    const { hashtag } = req.query;
    if (!hashtag) {
        return res.status(400).json({ error: 'Hashtag is required' });
    }

    try {
        const regex = new RegExp(`#${hashtag}$`, 'i'); 
        const users = await User.findOne({ name: regex });
        res.json(users);
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

})
module.exports = router;
