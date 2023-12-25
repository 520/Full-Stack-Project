var async = require('async');
const Borrowing = require("../model/borrowingModel");
const bcrypt = require("bcrypt");
const Result = require("../util/Result");
const CONSTANTS = require("../constant/constants");
const winston = require("winston");
const Page = require("../util/Page");
const TimeUtils = require("../util/TimeUtils");

module.exports.listBorrowing = async (req, res, next) => {
    try {
        let email = "e";
        const user = await Borrowing.find({});
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("list history failed, reason:", ex);
        return res.json(Result.failed("list history failed"));
    }
}

module.exports.getBorrowing = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const page = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const totalCount = await Borrowing.countDocuments({
            userId
        });
        const totalPages = Math.ceil(totalCount / pageSize);
        const user = await Borrowing.find({
            userId
        }).sort({createTime: -1})
            .skip((page - 1) * pageSize).limit(pageSize);
        const data = Page.new(user, page, totalPages);
        return res.json(Result.success(data));
    } catch (ex) {
        next(ex);
        winston.error("get history failed, reason:", ex.toString());
        return res.json(Result.failed("get history failed"));
    }
}

module.exports.addBorrowing = async (req, res, next) => {
    try {
        const createTime = TimeUtils.getCurrentFormattedTime();
        req.body.createTime = createTime;
        req.body.borrowDate = createTime;
        const user = await Borrowing.create(req.body);
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("add history failed, reason:", ex);
        return res.json(Result.failed("add history failed"));
    }
}

module.exports.updateBorrowing = async (req, res, next) => {
    try {
        const {id} = req.body;
        const user = await Borrowing.findByIdAndUpdate(id,
            req.body);
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("update history failed, reason:", ex);
        return res.json(Result.failed("update history failed"));
    }
}

module.exports.returnBorrowing = async (req, res, next) => {
    try {
        const returnDate = TimeUtils.getCurrentFormattedTime();
        const {id} = req.params;
        const user = await Borrowing.findByIdAndUpdate(id,
            {returnDate: returnDate});
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("update history failed, reason:", ex);
        return res.json(Result.failed("update history failed"));
    }
}

module.exports.deleteBorrowing = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id) {
            const user = await Borrowing.deleteOne({
                _id: id
            });
            return res.json(Result.success(user));
        } else {
            return res.json(Result.failed("id cannot be empty"));
        }
    } catch (ex) {
        next(ex);
        winston.error("delete history failed, reason:", ex);
        return res.json(Result.failed("delete history failed"));
    }
}
