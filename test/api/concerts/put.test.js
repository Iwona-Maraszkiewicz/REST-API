const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Concert #1', genre: 'rock', price: 25, day: 1, image: 'image.jpg', freeTickets: 25  });
        await testConOne.save();
      });

    it('/:id should update chosen document and return success', async () => {
      const res = await request(server).put('/api/concerts/5d9f1140f10a81216cfd4408').send({ performer: '=#Concert #1=' });
      const updatedConcert = await Concert.findOne({ _id: '5d9f1140f10a81216cfd4408' });
      expect(res.status).to.be.equal(200);
      expect(res.body).to.not.be.null;
      expect(updatedConcert.performer).to.be.equal('=#Concert #1=');
    });
    after(async () => {
        await Concert.deleteMany();
    });
});