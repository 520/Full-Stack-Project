var async = require('async');
const User = require("../model/userModel");
const Result = require("../util/Result");
const CONSTANTS = require("../constant/constants");
const winston = require("winston");
const mongoose = require("mongoose");
const {resolve} = require("path");
const {tokenEncryptPassword, tokenComparePassword, tokenSign, tokenVerify} = require("../auth/token");
const History = require("../model/historyModel");
const Page = require("../util/Page");
const TimeUtils = require("../util/TimeUtils");

module.exports.getToken = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.find({username: username});
        if (user[0]) {
            const isSame = await tokenComparePassword(password, user[0].password);
            if (isSame) {
                const token = tokenSign(username);
                user[0].token = token;
                user[0].password = "";
                return res.json(Result.success(user[0]));
            }
        }
        return res.json(Result.failed("wrong username or password"));
    } catch (ex) {
        next(ex);
        winston.error("get token failed, reason:", ex);
        return res.json(Result.failed("get token failed"));
    }
}

module.exports.listUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const totalCount = await User.countDocuments({});
        const totalPages = Math.ceil(totalCount / pageSize);
        const user = await User.find({})
            .sort({createTime: -1})
            .skip((page - 1) * pageSize).limit(pageSize);
        const data = Page.new(user, page, totalPages);
        return res.json(Result.success(data));
    } catch (ex) {
        next(ex);
        winston.error("get history failed, reason:", ex.toString());
        return res.json(Result.failed("get history failed"));
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const {id} = req.body;
        const user = await User.findOne({
            id
        });
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("get user failed, reason:", ex);
        return res.json(Result.failed("get user failed"));
    }
}

module.exports.addUser = async (req, res, next) => {
    try {
        req.body.createTime = TimeUtils.getCurrentFormattedTime();
        const {username, password} = req.body;
        const user = await User.find({username});
        if (user.size > 0) {
            return res.json(Result.failed("username exit"));
        }
        const encryptedPassword = await tokenEncryptPassword(password);
        req.body.password = encryptedPassword;
        await User.create(req.body);
        return res.json(Result.success("add user success"));
    } catch (ex) {
        next(ex);
        winston.error("add user failed, reason:", ex);
        return res.json(Result.failed("add user failed"));
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const {_id} = req.body;
        const user = await User.findByIdAndUpdate(_id, req.body);
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("update user failed, reason:", ex);
        return res.json(Result.failed("update user failed"));
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.deleteOne({
            _id: id
        })
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("delete user failed, reason:", ex);
        return res.json(Result.failed("delete user failed"));
    }
}
