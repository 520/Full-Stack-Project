const assert = require('chai').assert;
const ObjectUtils = require('../src/utils/ObjectUtils');

describe('StringUtils', function(){

    it('Check string empty', async function () {
        const test1 = {a:1};
        const test2 = {b:2};
        const test3 = {a:1,b:2};
        assert.equal(ObjectUtils.addObjects(test1, test2).a == test3.a, true);
        assert.equal(ObjectUtils.addObjects(test1, test2).b == test3.b, true);
    })

});
