
const mongoose=require('mongoose');
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    completed: {
        type: Boolean,
        default: false
    }
});
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
    skills:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Skill"
        }
    ],
    status:{
        type:Boolean,
        trim:true
    },
    contributors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            refL:"User"
        }
    ],
    tasks:[taskSchema]
})
const Project=mongoose.model('project',projectSchema);
module.exports=Project;