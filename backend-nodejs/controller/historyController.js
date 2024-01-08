var async = require('async');
const History = require("../model/historyModel");
const bcrypt = require("bcrypt");
const Result = require("../util/Result");
const CONSTANTS = require("../constant/constants");
const winston = require("winston");
const Page = require("../util/Page");
const TimeUtils = require("../util/TimeUtils");

module.exports.listHistory = async (req, res, next) => {
    try {
        let email = "e";
        const user = await History.find({});
        res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("list history failed, reason:", ex);
        res.json(Result.failed("list history failed"));
    }
}

module.exports.getHistory = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const page = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const totalCount = await History.countDocuments({
            userId
        });
        const totalPages = Math.ceil(totalCount / pageSize);
        const user = await History.find({
            userId
        }).sort({createTime: -1})
            .skip((page - 1) * pageSize).limit(pageSize);
        const data = Page.new(user, page, totalPages);
        res.json(Result.success(data));
    } catch (ex) {
        next(ex);
        winston.error("get history failed, reason:", ex.toString());
        res.json(Result.failed("get history failed"));
    }
}

module.exports.addHistory = async (req, res, next) => {
    try {
        const createTime = TimeUtils.getCurrentFormattedTime();
        req.body.createTime = createTime;
        const user = await History.create(req.body);
        res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("add history failed, reason:", ex);
        res.json(Result.failed("add history failed"));
    }
}

module.exports.updateHistory = async (req, res, next) => {
    try {
        const {id} = req.body;
        const user = await History.findByIdAndUpdate(id,
            req.body);
        res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("update history failed, reason:", ex);
        res.json(Result.failed("update history failed"));
    }
}

module.exports.deleteHistory = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id) {
            const user = await History.deleteOne({
                _id: id
            });
            res.json(Result.success(user));
        } else {
            res.json(Result.failed("id cannot be empty"));
        }
    } catch (ex) {
        next(ex);
        winston.error("delete history failed, reason:", ex);
        res.json(Result.failed("delete history failed"));
    }
}
