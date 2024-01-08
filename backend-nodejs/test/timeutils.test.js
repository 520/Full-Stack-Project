const assert = require('chai').assert;
const TimeUtils = require('../util/TimeUtils');

describe('TimeUtils', function(){
    it('Current timestamp should almost same', async function () {
        const timestamp = TimeUtils.getCurrentTimestamp();
        const timestamp1 = new Date().getTime() / 1000;
        assert.isBelow(timestamp1 - timestamp, 100);
    })

    it('Current formatted time is in right format', function () {
        const formattedTime = TimeUtils.getCurrentFormattedTime()
        const parsedDate = new Date(formattedTime);
        assert.notEqual(parsedDate.getTime(), NaN);
    })
});
