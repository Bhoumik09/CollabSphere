let mongoose=require('mongoose');
let AiSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
let AI=mongoose.model('AI',AiSchema);
module.exports=AI;
