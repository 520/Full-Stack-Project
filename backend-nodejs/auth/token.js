const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const winston = require("winston");
const PRIVATE_KEY = "PRIVATE_KEY";
async function tokenEncryptPassword (password) {
    return new Promise((resolve) => { bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            winston.error('Error hashing password:', err);
            resolve(null);
        } else {
            resolve(hash);
        }
    });
    })
}

async function tokenComparePassword(password, encryptedPassword) {
    return new Promise((resolve) => {
        bcrypt.compare(password, encryptedPassword, (err, result) => {
            if (err) {
                resolve(false);
            } else {
                resolve(result);
            }
        })
    })
}

async function tokenVerify (token) {
    return new Promise(resolve => {
        if (token.startsWith("Bearer")) {
            token = token.split("Bearer ")[1];
            jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
                if (!err) {
                    resolve(decoded);
                }
            });
        }
        resolve(null);
    });
}

function tokenSign (username) {
    const token = jwt.sign(
        {username},
        PRIVATE_KEY,
        {expiresIn: '240h'}
    );
    return token;
}


module.exports = {
    tokenComparePassword,
    tokenEncryptPassword,
    tokenVerify,
    tokenSign
}

