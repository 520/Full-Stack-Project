const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:String,
    userId:String,
    realName: String,
    bookId:String,
    comment:String,
    score:String,
    createTime:Date,
    updateTime: Date,
});

module.exports = mongoose.model("comment", userSchema);
