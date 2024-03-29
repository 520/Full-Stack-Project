const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:String,
    bookId:String,
    title: String,
    userId:String,
    borrowDate:Date,
    returnDate:Date,
    createTime: Date,
    updateTime:Date
});

module.exports = mongoose.model("borrowing", userSchema);
