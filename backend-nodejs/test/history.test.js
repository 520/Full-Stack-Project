const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('History API', () => {
    it('should respond 200 and code 0 and get history list', async () => {
        const res = await chai.request(app).get('/history/al');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.be.an('array');
    });


    it('should respond 200 and code 0 and add history', async () => {
        const borrowing = {userId: 'test', keyword: 'test'}
        const res = await chai.request(app)
            .post('/history').send(borrowing);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.be.an('object');
    });

    it('should respond 200 and code 0 and get history list by userid', async () => {
        const res = await chai.request(app).get('/history/test');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.have.property('records');
        expect(res.body.data).to.have.property('currentPage');
        expect(res.body.data).to.have.property('totalPages');
        expect(res.body.data.records).to.be.an('array');
    });



});
