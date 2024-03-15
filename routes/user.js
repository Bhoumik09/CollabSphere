const mongoose = require('mongoose');
const User = require('../models/User');
const Skill = require('../models/Skill');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/new/profile', upload.single('img'), async (req, res) => {
    try {
        let { name, email, github, linkedin, skills } = req.body;
        let skillNames = JSON.parse(skills);

        // Create and save skills
        let savedSkills = await Promise.all(skillNames.map(async (name) => {
            let skill = new Skill({ name });
            return await skill.save();
        }));
        console.log(savedSkills)
        // Create user
        let user = new User({
            name,
            email,
            github,
            linkedin,
            coins: 0,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            skills: savedSkills.map(skill => skill._id)
        });

        await user.save();

        res.status(201).json({ msg: "User created" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
