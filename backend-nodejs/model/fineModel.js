const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:Number,
    userid:Number,
    borrowingsId:Number,
    fine:Number,
    isPaid:Boolean,
    paidTime:Date,
    createTime:Date,
    updateTime:Date,
});

module.exports = mongoose.model("fine", userSchema);
