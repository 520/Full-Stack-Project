const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:Number,
    senderId:Number,
    receiverId:Number,
    senderName:String,
    receiverName:String,
    content:String,
    sendDate:Date,
    createTime:Date,
    updateTime: Date,
});

module.exports = mongoose.model("message", userSchema);
