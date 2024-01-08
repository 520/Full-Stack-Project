const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

describe('User API', () => {

    it('should respond 200 and code 0 and add user and get token and delete', async () => {
        const user = {username: 'test', password: 'test'}
        const res = await chai.request(app)
            .post('/user').send(user);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('code', 0);

        const res1 = await chai.request(app).post('/user/token').send(user);
        expect(res1).to.have.status(200);
        expect(res1.body).to.have.property('code');
        expect(res1.body).to.have.property('code', 0);
        expect(res1.body.data).to.be.an('object');

    });


});
