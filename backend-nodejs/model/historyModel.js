const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    id:Number,
    userId:Number,
    keyword: String,
    createTime:Date,
    updateTime:Date,
});

module.exports = mongoose.model("history", historySchema);
