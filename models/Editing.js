let mongoose=require('mongoose');
let EditSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
let Edit=mongoose.model('Edit', EditSchema);
module.exports=Edit
