
const mongoose=require('mongoose');
const projectSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    desc:{
        type:String,
        trim:true,
    },
    
})
const ProjectModel=mongoose.model('project',projectSchema);
module.exports=ProjectModel;