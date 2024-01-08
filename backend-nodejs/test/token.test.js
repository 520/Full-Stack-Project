const assert = require('chai').assert;
const {
    tokenComparePassword,
    tokenEncryptPassword,
    tokenVerify,
    tokenSign
} = require('../auth/token');

describe('Token', function(){
    it('bcrypt encrypted password should NOT be same', async function () {
        const password = "password";
        const encrypted1 = await tokenEncryptPassword(password);
        const encrypted2 = await tokenEncryptPassword(password);
        assert.notEqual(encrypted1, encrypted2);
    })

    it('password should be matched', async function () {
        const password = "password";
        const encrypted1 = await tokenEncryptPassword(password);
        const result = await tokenComparePassword(password, encrypted1);
        assert.equal(result, true);
    })

    it('get user info by token', async function () {
        const username = 'username';
        const token = "Bearer " + tokenSign(username);
        const username1 = await tokenVerify(token);
        assert.equal(username1.username, username);
    })
});

