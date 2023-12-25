var async = require('async');
const Fine = require("../model/fineModel");
const bcrypt = require("bcrypt");
const Result = require("../util/Result");
const CONSTANTS = require("../constant/constants");
const winston = require("winston");

module.exports.listFine = async (req, res, next) => {
    try {
        let email = "e";
        const user = await Fine.find({});
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("list fine failed, reason:", ex);
        return res.json(Result.failed("list fine failed"));
    }
}

module.exports.getFine = async (req, res, next) => {
    try {
        const {id} = req.body;
        const user = await Fine.findOne({
            id
        });
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("get find failed, reason:", ex);
        return res.json(Result.failed("get find failed"));
    }
}

module.exports.addFine = async (req, res, next) => {
    try {
        let email = "e";
        const user = await Fine.create(req);
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("add find failed, reason:", ex);
        return res.json(Result.failed("add find failed"));
    }
}

module.exports.updateFine = async (req, res, next) => {
    try {
        const {id, email} = req.body;
        const user = await Fine.findByIdAndUpdate(id,
            {
                email: email
            });
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("update find failed, reason:", ex);
        return res.json(Result.failed("update find failed"));
    }
}

module.exports.deleteFine = async (req, res, next) => {
    try {
        const {id, email} = req.body;
        const user = await Fine.findByIdAndUpdate(id,
            {
                isDeleted: CONSTANTS.IS_DELETED
            });
        return res.json(Result.success(user));
    } catch (ex) {
        next(ex);
        winston.error("delete find failed, reason:", ex);
        return res.json(Result.failed("delete find failed"));
    }
}
