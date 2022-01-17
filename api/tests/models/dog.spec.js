const { Dog, conn,Temperament } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});
describe('Temperament model', function () {
  beforeEach(async function() {
    await Temperament.sync({ force: false});
  });
  it('should throw an error if name is null', (done) => {
    Temperament.create({id: "133dasdd3434"})
      .then(() => done(new Error('It requires a valid name')))
      .catch(() => done());
  });
  it('Name dshould be a STRING', function(){
    expect(typeof Temperament.name).equal("string")
  })

  });

