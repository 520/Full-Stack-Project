const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        id:Number,
        title:String,
        author:String,
        ISBN:String,
        genre:String,
        publicationYear:String,
        bookCoverUrl:String,
        pdfUrl: String,
        location:String,
        description:String,
        createDate:Date,
        edition:String,
        format:String,
        language:String,
        identifier:String,
        type:String,
        source:String,
        subjects:String,
        information:String,
        isDeleted:Boolean,
        createTime:Date,
        updateTime:Date,
});

module.exports = mongoose.model("book", userSchema);
