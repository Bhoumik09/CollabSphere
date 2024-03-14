let mongoose=require('mongoose');
let UISchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
let UI=mongoose.model('UI',UISchema);
module.exports=UI;
