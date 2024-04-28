let express=require('express');
const User = require('../models/User');
let router=express.Router();
router.get('/leader',async(req,res)=>{
       let users=await User.find({}); 
       let arr=users.map((value,index)=>{
            return {name:value.name,coins:value.coins,id:value._id}
       })
       console.log(arr)
       arr.sort((a, b) => {
          // Sort in descending order based on coins
          return a.coins - b.coins;
      });
       res.send(arr)
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
module.exports=router;