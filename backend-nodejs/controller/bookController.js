var async = require('async');
const Book = require("../model/bookModel");
const Borrowing = require("../model/borrowingModel");
const bcrypt = require("bcrypt");
const Result = require("../util/Result");
const CONSTANTS = require("../constant/constants");
const winston = require("winston");
const History = require("../model/historyModel");
const Page = require("../util/Page");
const TimeUtils = require("../util/TimeUtils");

module.exports.listBook = async (req, res, next) => {
    try {
        const page = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const totalCount = await Book.countDocuments({
        });
        const totalPages = Math.ceil(totalCount / pageSize);
        const user = await Book.find({
        }).sort({createTime: -1})
            .skip((page - 1) * pageSize).limit(pageSize);
        const data = Page.new(user, page, totalPages);
        return res.json(Result.success(data));
    } catch (ex) {
        next(ex);
        winston.error("list book failed, reason:", ex.toString());
        return res.json(Result.failed("list book failed"));
    }
}

module.exports.getBookByTitle = async (req, res, next) => {
    try {
        const {title} = req.params;
        const page = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const regex = new RegExp(title, 'i');
        const totalCount = await Book.countDocuments({ title: { $regex: regex } });
        const totalPages = Math.ceil(totalCount / pageSize);
        const books = await Book.find({ title: { $regex: regex } })
            .sort({createTime: -1})
            .skip((page - 1) * pageSize).limit(pageSize);
        const data = Page.new(books, page, totalPages);
        return res.json(Result.success(data));
    } catch (ex) {
        next(ex);
        winston.error("get book failed, reason:", ex);
        return res.json(Result.failed("get book failed"));
    }
}

module.exports.getBookById = async (req, res, next) => {
    try {
        const {bookId} = req.params;
        const book = await Book.findOne({ _id: bookId });
        return res.json(Result.success(book));
    } catch (ex) {
        next(ex);
        winston.error("get book failed, reason:", ex);
        return res.json(Result.failed("get book failed"));
    }
}

module.exports.addBook = async (req, res, next) => {
    try {
        const createTime = TimeUtils.getCurrentFormattedTime();
        req.body.createTime = createTime;
        const user = await Book.create(req.body);
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("add book failed, reason:", ex);
        return res.json(Result.failed("add book failed"));
    }
}

module.exports.updateBook = async (req, res, next) => {
    try {
        const {_id} = req.body;
        const user = await Book.findByIdAndUpdate(_id,
            req.body);
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("update book failed, reason:", ex);
        return res.json(Result.failed("update book failed"));
    }
}

module.exports.deleteBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await Book.deleteOne({_id:id});
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("delete book failed, reason:", ex);
        return res.json(Result.failed("delete book failed"));
    }
}
