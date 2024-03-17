const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    github:{
        type:String,
        trim:true,
    },
    linkedin:{
        type:String,
        trim:true
    },
    coins:{
        type:Number,
        default:0
    },
    img:{
        data: Buffer, // Store the image data as a Buffer
        contentType: String
    },
    skills:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Skill"
        }
    ]
    ,
    projects:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Project'
        }
    ]
})
const User=mongoose.model('User',userSchema);
module.exports=User;