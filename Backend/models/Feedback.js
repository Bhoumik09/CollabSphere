
const mongoose=require('mongoose');
const feedbackSchema=new mongoose.Schema({
    
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
    },
    message:{
        type:String,
        trim:true,
    }
    
})
const Feedback=mongoose.model('feedback',feedbackSchema);
module.exports=Feedback;