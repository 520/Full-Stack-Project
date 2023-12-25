const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        id:Number,
        libraryId:Number,
        username:String,
        password:String,
        email:String,
        realName:String,
        phone:String,
        questionOne:String,
        questionTwo:String,
        questionThree:String,
        answerOne:String,
        answerTwo:String,
        answerThree:String,
        role:String,
        createTime:Date,
        updateTime:Date,
        isActive:Boolean,
        isDeleted:Boolean
});

module.exports = mongoose.model("user", userSchema);
