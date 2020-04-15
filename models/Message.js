const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema=new Schema({
    author:{type:String,required:true},
    message:{type:String, required:true},
    title:{type:String,required:true},
    date:{type:Date}
});



const Message= mongoose.model('message',MessageSchema);


module.exports = Message;


