var async = require('async');
const Save = require("../model/saveModel");
const bcrypt = require("bcrypt");
const Result = require("../util/Result");
const CONSTANTS = require("../constant/constants");
const winston = require("winston");
const TimeUtils = require("../util/TimeUtils");
const History = require("../model/historyModel");
const Page = require("../util/Page");

module.exports.listSave = async (req, res, next) => {
    try {
        let email = "e";
        const user = await Save.find({});
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("list save failed, reason:", ex);
        return res.json(Result.failed("list save failed"));
    }
}

module.exports.getSave = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const page = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const totalCount = await Save.countDocuments({
            userId
        });
        const totalPages = Math.ceil(totalCount / pageSize);
        const user = await Save.find({
            userId
        }).sort({createTime: -1})
            .skip((page - 1) * pageSize).limit(pageSize);
        const data = Page.new(user, page, totalPages);
        return res.json(Result.success(data));
    } catch (ex) {
        next(ex);
        winston.error("get save failed, reason:", ex.toString());
        return res.json(Result.failed("get save failed"));
    }
}

module.exports.addSave = async (req, res, next) => {
    try {
        req.body.createTime = TimeUtils.getCurrentFormattedTime();
        const user = await Save.create(req.body);
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("add save failed, reason:", ex);
        return res.json(Result.failed("add save failed"));
    }
}

module.exports.updateSave = async (req, res, next) => {
    try {
        const {id, email} = req.body;
        const user = await Save.findByIdAndUpdate(id,
            {
                email: email
            });
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("update save failed, reason:", ex);
        return res.json(Result.failed("update save failed"));
    }
}

module.exports.deleteSave = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id) {
            const user = await Save.deleteOne({
                _id: id
            });
            return res.json(Result.success(user));
        } else {
            return res.json(Result.failed("id cannot be empty"));
        }
    } catch (ex) {
        next(ex);
        winston.error("delete save failed, reason:", ex);
        return res.json(Result.failed("delete save failed"));
    }
}
