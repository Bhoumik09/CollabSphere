let mongoose=require('mongoose');
let MernSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
let Mern=mongoose.model('MERN',MernSchema);
module.exports=Mern;
