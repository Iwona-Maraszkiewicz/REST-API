const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Concert #1', genre: 'rock', price: 25, day: 1, image: 'image.jpg', freeTickets: 25 });
        await testConOne.save();

        const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Concert #2', genre: 'pop', price: 45, day: 1, image: 'image.jpg', freeTickets: 45  });
        await testConTwo.save();
    });

    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:id should return one concert by :id ', async () => {
        const res = await request(server).get('/api/concerts/5d9f1159f81ce8d1ef2bee48');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    after(async () => {
        await Concert.deleteMany();
    });
});