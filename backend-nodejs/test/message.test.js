const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('Message API', () => {
    it('should respond 200 and code 0 and get message list', async () => {
        const res = await chai.request(app).get('/message');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.be.an('array');
    });
});
