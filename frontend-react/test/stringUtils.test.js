const assert = require('chai').assert;
const StringUtils = require('../src/utils/StringUtils');

describe('StringUtils', function(){

    it('Check string empty', async function () {
        const test1 = "a@a.com";
        const test2 = "";
        const test3 = " ";
        const test4 = NaN;
        const test5 = undefined;
        let test6;
        assert.equal(StringUtils.isEmpty(test1), false);
        assert.equal(StringUtils.isEmpty(test2), true);
        assert.equal(StringUtils.isEmpty(test3), true);
        assert.equal(StringUtils.isEmpty(test4), true);
        assert.equal(StringUtils.isEmpty(test5), true);
        assert.equal(StringUtils.isEmpty(test6), true);
    })

    it('Detect it is a email', async function () {
        const test1 = "a@a.com";
        const test2 = "a.a.com";
        const test3 = "aacom";
        const test4 = "123@123.com";
        assert.equal(StringUtils.isEmail(test1), true);
        assert.equal(StringUtils.isEmail(test2), false);
        assert.equal(StringUtils.isEmail(test3), false);
        assert.equal(StringUtils.isEmail(test4), true);
    })

    it('Detect it is a phone', async function () {
        const test1 = "7829193223";
        const test2 = "39483929";
        const test3 = "qwertyuiop";
        const test4 = "qwerty1234";
        assert.equal(StringUtils.isPhone(test1), true);
        assert.equal(StringUtils.isPhone(test2), false);
        assert.equal(StringUtils.isPhone(test3), false);
        assert.equal(StringUtils.isPhone(test4), false);
    })

    it('Detect it is a year', async function () {
        const test1 = "2000";
        const test2 = "1000";
        const test3 = "2033";
        const test4 = "qwer";
        const test5 = "20qw";
        assert.equal(StringUtils.isYear(test1), true);
        assert.equal(StringUtils.isYear(test2), false);
        assert.equal(StringUtils.isYear(test3), false);
        assert.equal(StringUtils.isYear(test4), false);
        assert.equal(StringUtils.isYear(test5), false);
    })

});
