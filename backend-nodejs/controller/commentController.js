var async = require('async');
const Comment = require("../model/commentModel");
const bcrypt = require("bcrypt");
const Result = require("../util/Result");
const CONSTANTS = require("../constant/constants");
const winston = require("winston");
const TimeUtils = require("../util/TimeUtils");

module.exports.listComment = async (req, res, next) => {
    try {
        const user = await Comment.find({});
        res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("list comment failed, reason:", ex);
        res.json(Result.failed("list comment failed"));
    }
}

module.exports.getComment = async (req, res, next) => {
    try {
        const {bookId} = req.params;
        const user = await Comment.find({
            bookId
        });
        res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("get comment failed, reason:", ex);
        res.json(Result.failed("get comment failed"));
    }
}

module.exports.addComment = async (req, res, next) => {
    try {
        req.body.createTime = TimeUtils.getCurrentFormattedTime();
        const user = await Comment.create(req.body);
        res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("add comment failed, reason:", ex);
        res.json(Result.failed("add comment failed"));
    }
}

module.exports.updateComment = async (req, res, next) => {
    try {
        const {id, email} = req.body;
        const user = await Comment.findByIdAndUpdate(id,
            {
                email: email
            });
        res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("update comment failed, reason:", ex);
        res.json(Result.failed("update comment failed"));
    }
}

module.exports.deleteComment = async (req, res, next) => {
    try {
        const {id, email} = req.body;
        const user = await Comment.findByIdAndUpdate(id,
            {
                isDeleted: CONSTANTS.IS_DELETED
            });
        res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("delete comment failed, reason:", ex);
        res.json(Result.failed("delete comment failed"));
    }
}
