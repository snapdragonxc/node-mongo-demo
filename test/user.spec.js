var request = require('supertest');
var app = require('../app');
var User = require('../models/user');
var expect  = require('chai').expect;

describe('GET /', function() {
  it('respond with hello world', function(done) {
    request(app).get('/').expect('Hello world', done);
  });
});

describe('POST / addname ', () => {
  it('clean database', (done) => {
    User.remove({}).exec().then(() => { done(); });
  });

  it('can add a name', (done) => {
    request(app).post('/addname')
      .send({ name: 'mark'}).end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.text).to.equal('mark');
        User.findOne({name: 'mark'}, (err, data) => {
          if (err) {
            done(err);
          }
          expect(data.name).to.equal('mark');
          done();
        });
      })
    });
});

describe('GET / names', function(){
  var myNames = [{
      name: 'mark'
    }, {
      name: 'john'
    }, {
      name: 'neil'
    }];
  it('clean database', (done) => {
    User.remove({}).exec().then(() => { done(); });
  });
  it('seed users', (done) => {
    User.create(myNames, (err, data) => {
      if (err) {
        done(err);
      }
      done();
    });
  });
  it('can get all names', (done) => {
    request(app).get('/names').end((err, res) => {
      if (err) {
        done(err);
      };
      var names = res.body.map((data) => ({ name: data.name }));
      names.forEach((user) => {
        var found = myNames.find(item => (item.name === user.name));
        expect(user.name).to.equal(found.name);
      });
      done();
    });
  });
});
