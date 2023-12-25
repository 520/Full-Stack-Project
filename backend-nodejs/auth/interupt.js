const Result = require("../util/Result");
const {tokenVerify} = require("../auth/token");

module.exports = async (req, res, next) => {
    // const token = req.headers['authorization'];
    // if (!whiteList.some(white => req.path.includes(white))) {
    //     const result = await tokenVerify(token);
    //     if (!result) {
    //         return res.status(401).json(Result.failed("unauthorized"));
    //     }
    // }
    next();
}

const whiteList = [
    "/user/token"
]
