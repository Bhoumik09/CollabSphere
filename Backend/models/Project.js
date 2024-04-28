
const mongoose=require('mongoose');

const projectSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    field:{
        type:String,
        trim:true,
        required:true
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
    
    status:{
        type:Boolean,
        trim:true,
        default:true
    },
    contributors:[
        {
            type:mongoose.Schema.Types.ObjectId,
            refL:"User"
        }
    ],
    github:{
        type:String,
        trim:true,
    },
    request:[
        {
            type:mongoose.Schema.Types.ObjectId,
            refL:"User"
        }
    ],
    blocked:[
        {
            type:mongoose.Schema.Types.ObjectId,
            refL:"User"
        }
    ]
})
const Project=mongoose.model('project',projectSchema);
module.exports=Project;