const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating and exporting model
const userSchema=new Schema({
    username:{type:String, required:true},
    author:{type:String, required:true},
    dob:{type:Date},
    messages:[{type:Schema.Types.ObjectId,ref:'Message'}]
});



const User= mongoose.model('user',userSchema);


module.exports = User;
