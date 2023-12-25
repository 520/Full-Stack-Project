var async = require('async');
const Message = require("../model/messageModel");
const bcrypt = require("bcrypt");
const Result = require("../util/Result");
const CONSTANTS = require("../constant/constants");
const winston = require("winston");
const TimeUtils = require("../util/TimeUtils");

module.exports.listMessage = async (req, res, next) => {
    try {
        const messages = await Message.find({});
        return res.json(Result.success(messages));
    } catch (ex) {
        next(ex);
        winston.error("list message failed, reason:", ex);
        return res.json(Result.failed("list message failed"));
    }
}

module.exports.getMessage = async (req, res, next) => {
    try {
        const {id} = req.body;
        const user = await Message.findOne({
            id
        });
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("get message failed, reason:", ex);
        return res.json(Result.failed("get message failed"));
    }
}

module.exports.addMessage = async (req, res, next) => {
    try {
        req.body.sendDate = TimeUtils.getCurrentFormattedTime();
        req.body.createTime = TimeUtils.getCurrentFormattedTime();
        const message = await Message.create(req.body);
        return res.json(Result.success(message));
    } catch (ex) {
        next(ex);
        winston.error("add message failed, reason:", ex);
        return res.json(Result.failed("add message failed"));
    }
}

module.exports.updateMessage = async (req, res, next) => {
    try {
        const {id, email} = req.body;
        const user = await Message.findByIdAndUpdate(id,
            {
                email: email
            });
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("update message failed, reason:", ex);
        return res.json(Result.failed("update message failed"));
    }
}

module.exports.deleteMessage = async (req, res, next) => {
    try {
        const {id, email} = req.body;
        const user = await Message.findByIdAndUpdate(id,
            {
                isDeleted: CONSTANTS.IS_DELETED
            });
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("delete message failed, reason:", ex);
        return res.json(Result.failed("delete message failed"));
    }
}
