const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('Book API', () => {
    it('should respond 200 and code 0 and book list', async () => {
        const res = await chai.request(app).get('/book');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.have.property('records');
        expect(res.body.data).to.have.property('currentPage');
        expect(res.body.data).to.have.property('totalPages');
        expect(res.body.data.records).to.be.an('array');
    });


    it('should respond 200 and code 0 and add book', async () => {
        const book = {title: 'test', author: 'test'}
        const res = await chai.request(app)
            .post('/book').send(book);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.be.an('object');
    });

    it('should respond 200 and code 0 and book list', async () => {
        const res = await chai.request(app).get('/book/test');
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);
        expect(res.body.data).to.have.property('records');
        expect(res.body.data).to.have.property('currentPage');
        expect(res.body.data).to.have.property('totalPages');
        expect(res.body.data.records).to.be.an('array');
    });


});
