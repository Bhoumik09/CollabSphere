let express = require("express");
const Project = require("../models/Project");
const User = require("../models/User");
let router = express.Router();

router.get('/project', async (req, res) => {
  const userId = req.query.userId;
  console.log(userId);

  try {
    // Fetch user's projects where the user is either the author or a contributor
    const projects = await Project.find({
      $or: [
        { author: userId },
        { contributors: userId }
      ]
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/project/:id/accept', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(userId);
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    console.log(project.request.length);
    // Remove userId from request array
    project.request = project.request.filter(userId => JSON.stringify(userId) !== JSON.stringify(userId));
    console.log(project.request.length);

    // Add userId to contributors array
    if (!project.contributors.includes(userId)) {
      project.contributors.push(userId);
    }

    // Find the user and update the coins
    const user = await User.findById(userId);
    if (user) {
      user.coins += 5;
      await user.save();
    }

    await project.save();

    return res.status(200).json({ message: 'User added to contributors' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/project/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(userId);
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Remove userId from request array
    project.request = project.request.filter(userId => JSON.stringify(userId) !== JSON.stringify(userId));
    // Add userId to contributors array
    if (!project.blocked.includes(userId)) {
      project.blocked.push(userId);
    }

    await project.save();

    return res.status(200).json({ message: 'User added to contributors' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/project/request/:id', async (req, res) => {
  try {
    let { id } = req.params;
    let { userId } = req.body;
    let project = await Project.findById(id);
    console.log(project.request.includes(userId));
    if (project.request.includes(userId)) {
      res.send({ msg: "your request is pending" });
    } else {
      project.request.push(userId);
      await project.save();
    }
  } catch (error) {
    console.error('Error handling project request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/project/request/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;

  try {
    const project = await Project.findById(id);

    const isPending = project.request.includes(userId);
    const isBlocked = project.blocked.includes(userId);
    const isAccepted = project.contributors.includes(userId);

    res.json({ isPending, isBlocked, isAccepted });
  } catch (error) {
    console.error('Error checking pending status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/project/all", async (req, res) => {
  try {
    let projects = await Project.find({});
    res.send(projects);
  } catch (error) {
    console.error('Error fetching all projects:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/project/:id", async (req, res) => {
  let { id } = req.params;
  let { last } = req.query;
  console.log(last);
  try {
    let project = await Project.findById(id);
    let reqArr = last === 'team' ? project?.contributors : project?.request;

    res.json({ reqArr });
  } catch (e) {
    res.sendStatus(404).json({ msg: e.message });
  }
});

router.post("/project/new", async (req, res) => {
  let { title, desc, git, id, field } = req.body;
  console.log(req.body);
  try {
    await Project.create({ name: title, author: id, desc: desc, github: git, field });
  } catch (e) {
    res.status(404).json({ msg: e.message });
  }
});

module.exports = router;