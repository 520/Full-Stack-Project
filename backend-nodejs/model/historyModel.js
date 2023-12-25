const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    id:String,
    userId:String,
    keyword: String,
    createTime:Date,
    updateTime:Date,
});

module.exports = mongoose.model("history", historySchema);
