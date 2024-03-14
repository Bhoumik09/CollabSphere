let mongoose=require('mongoose');
let MlSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
let ML=mongoose.model('ML',MlSchema);
module.exports=ML;
