const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
    id:Number,
    userId:Number,
    bookId: String,
    title: String,
    createTime:Date,
    updateTime:Date,
});

module.exports = mongoose.model("save", saveSchema);
