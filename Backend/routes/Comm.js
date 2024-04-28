let express = require("express");
const Community = require("../models/community");
const Project = require("../models/Project");
let router = express.Router();
router.get("/community/all", async (req, res) => {
  try {
    const communities = await Community.find({}, { name: 1, description: 1,members:1 });
    res.status(200).json(communities);
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/community/joined/:id/members",async(req,res)=>{
  try {
    let {id}=req.params;
    const community = await Community.findById(id, {members:1 }).populate('members');
    res.status(200).json(community);
  } catch (error) {
    console.error("Error fetching communities:", error);
    res.status(500).json({ error: "Internal server error" });
  }

})
router.get("/community/joined", async (req, res) => {
    let id=req.query.id;
    try {
      const communities = await Community.find( {members:id},{ name: 1, description: 1 ,members:1});
      res.status(200).json(communities);
    } catch (error) {
      console.error("Error fetching communities:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
router.post("/community/join/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    // Find the community by name
    const community = await Community.findById(id);

    // If the community doesn't exist, return an error
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Check if the user is already a member of the community
    if (community.members.includes(userId)) {
      return res.status(400).json({ error: "User is already a member" });
    }

    // Add the user to the community members array
    community.members.push(userId);
    await community.save();

    res.status(200).json({ message: "User joined the community successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/community/leave/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    // Find the community by name
    const community = await Community.findById(id);

    // If the community doesn't exist, return an error
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Check if the user is already a member of the community
    if (!community.members.includes(userId)) {
      return res.status(400).json({ error: "Not a member" });
    }

    // Add the user to the community members array
    community.members=community.members.filter((user)=>(
      user!=userId
    ))
    await community.save();

    res.status(200).json({ message: "User Left the community successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
