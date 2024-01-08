const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('Comment API', () => {
    it('should respond 200 and code 0 and get comment list', async () => {
        const res = await chai.request(app).get('/comment');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.be.an('array');
    });


    it('should respond 200 and code 0 and add borrowing', async () => {
        const borrowing = {userId: 'test', bookId: 'test', comment: 'test', score: '5'}
        const res = await chai.request(app)
            .post('/comment').send(borrowing);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.be.an('object');
    });

    it('should respond 200 and code 0 and get borrowing list by userid', async () => {
        const res = await chai.request(app).get('/comment/test');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.be.an('array');
    });



});