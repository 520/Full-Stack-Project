const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
    id:String,
    userId:String,
    bookId: String,
    title: String,
    createTime:Date,
    updateTime:Date,
});

module.exports = mongoose.model("save", saveSchema);
