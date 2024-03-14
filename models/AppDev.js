let mongoose=require('mongoose');
let AppSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
let APP=mongoose.model('APP',AppSchema);
module.exports=APP;
