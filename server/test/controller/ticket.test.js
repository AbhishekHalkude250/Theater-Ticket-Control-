const sinon = require('sinon');
const {
  expect,
  assert
} = require('chai');
const loopback = require('loopback');
const mock = require('./mock/ticket.json');

describe('ticket api', () => {
  let appContext = loopback();
  appContext = {
    models: {
      ticket: {
        findById: sinon.stub(),
        find: sinon.stub(),
        create: sinon.stub(),
        findOne: sinon.stub(),
        destroyById: sinon.stub()
      }
    }
  }
  beforeAll(async () => {
    require('../../boot/controllers/ticket.js')(appContext)
  });

  afterAll(async () => {
    appContext = null;
  });
  describe('get all tickets', () => {
    const fakeErr = {
      err: 'Fake Error', statusCode: 400
    };
    it('should return the dashboards', async () => {
      appContext.models.ticket.find = () => Promise.resolve(mock.ticketResponse);
      const result = await appContext.models.ticket.getAllTicket({});
      expect(result).to.be.not.null;
      expect(result).to.be.an('array');
      expect(result).equal(mock.ticketResponse);
    });

    it('Incase of no data it should return [] array', async () => {
      appContext.models.ticket.find = () => Promise.resolve([]);
      const result = await appContext.models.ticket.getAllTicket({});
      expect(result).to.be.not.null;
      expect(result).to.be.an('array');
      expect(result).to.deep.equal([]);
    });

    it('throw error when failed to get data from function', async () => {
      try {
        appContext.models.ticket.find = () => Promise.reject(fakeErr);
        await appContext.models.ticket.getAllTicket({});
      } catch (err) {
        console.log('err', err);
        expect(err).to.be.not.null;
        expect(err).to.be.an('object');
        expect(err.statusCode).to.equal(400);
        expect(err).to.equal(fakeErr);
      }
    });

  });


  describe('create tickets', () => {
    const fakeErr = {
      err: 'Fake Error', statusCode: 400
    };

    it('should create ticket', async () => {
      appContext.models.ticket.create = () => Promise.resolve(mock.ticketCreation);
      const result = await appContext.models.ticket.createTicket(mock.payload);
      expect(result).to.be.not.null;
      expect(result).to.be.an('object');
      expect(result).equal(mock.ticketCreation);
    });

    it('throw error when failed to create ticket', async () => {
      try {
        appContext.models.ticket.create = () => Promise.reject(fakeErr);
        await appContext.models.ticket.getAllTicket({});
      } catch (err) {
        expect(err).to.be.not.null;
        expect(err).to.be.an('object');
        expect(err.statusCode).to.equal(400);
        expect(err).to.deep.equal(fakeErr);
      }
    });
  });

  describe('update tickets', () => {
    const fakeErr = {
      err: 'Fake Error',
      "statusCode": 400
    };

    it('it should update ticket with new data', async () => {
      mock.singelTicket.save = () => Promise.resolve();
      appContext.models.ticket.findOne = () => Promise.resolve(mock.singelTicket);
      const result = await appContext.models.ticket.updateTicket('8_MlCn0BiIx3pl9mA0bO', mock.updateTicket);
      expect(result).to.be.not.null;
      expect(result).to.be.an('object');
      expect(result).equal(mock.singelTicket);
    });

    it('throw error when failed to update ticket', async () => {
      try {
        appContext.models.ticket.findOne = () => Promise.reject(fakeErr);
        await appContext.models.ticket.updateTicket('8_MlCn0BiIx3pl9mA0bO', mock.updateTicket);
      } catch (err) {
        expect(err).to.be.not.null;
        expect(err).to.be.an('object');
        expect(err.statusCode).to.equal(400);
        expect(err).to.deep.equal(fakeErr);
      }
    });
  });


  describe('create tickets', () => {
    const fakeErr = {
      err: 'Fake Error', statusCode: 400
    };

    it('should delete ticket', async () => {
      appContext.models.ticket.destroyById = () => Promise.resolve(mock.deleteResponse);
      const result = await appContext.models.ticket.deleteTicket('8_MlCn0BiIx3pl9mA0bO');
      expect(result).to.be.not.null;
      expect(result).to.be.an('object');
      expect(result).equal(mock.deleteResponse);
    });

    it('throw error when failed to create ticket', async () => {
      try {
        appContext.models.ticket.destroyById = () => Promise.reject(fakeErr);
        await appContext.models.ticket.deleteTicket('8_MlCn0BiIx3pl9mA0bO');
      } catch (err) {
        expect(err).to.be.not.null;
        expect(err).to.be.an('object');
        expect(err.statusCode).to.equal(400);
        expect(err).to.deep.equal(fakeErr);
      }
    });
  });
});
