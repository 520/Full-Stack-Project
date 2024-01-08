const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('Favourite API', () => {
    it('should respond 200 and code 0 and get favourite list', async () => {
        const res = await chai.request(app).get('/save');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
    });


    it('should respond 200 and code 0 and add favourite', async () => {
        const borrowing = {userId: 'test', bookId: 'test'}
        const res = await chai.request(app)
            .post('/save').send(borrowing);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.be.an('object');
    });

    it('should respond 200 and code 0 and get favourite list by userid', async () => {
        const res = await chai.request(app).get('/save/test');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.have.property('records');
        expect(res.body.data).to.have.property('currentPage');
        expect(res.body.data).to.have.property('totalPages');
        expect(res.body.data.records).to.be.an('array');
    });

});