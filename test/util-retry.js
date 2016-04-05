'use strict';

const expect = require('expect.js');
const retry = require('..');
const asyncfn = require('./fixtures/fn');

describe('retry()', _=>{

  describe('options accepted', _=>{

    it('should accept function and default to 3 retries', function(done){

      var fn = retry(asyncfn.onlyCallback(4));

      fn(err=>{
        expect(err).to.be.an(Error);
        expect(err.message).to.be('3');
        done();
      })
    });

    it('should accept number to `times` options', function(done) {
      var fn = retry(5, asyncfn.onlyCallback(6));
      var start = Date.now();

      fn(err=>{
        expect(err).to.be.an(Error);
        expect(err.message).to.be('5');
        done();
      })
    });

    it('should accept object as options', function(done) {
      var fn = retry({times: 2, wait: 100}, asyncfn.onlyCallback(3));
      var start = Date.now();
      fn(err=>{

        var diff = Date.now() - start;
        expect(err).to.be.an(Error);
        expect(err.message).to.be('2');
        expect(diff).to.be.above(100);
        done();
      });
    });

    it('should accept `times` options to limit the retries', function(done) {
      var fn = retry({times: 2}, asyncfn.onlyCallback(2));
      fn((err, res)=>{
        expect(err).to.be(null);
        expect(res).to.be(2);
        done();
      });
    });

    it('should retry till successful response if under `times` limitation', function(done) {
      var fn = retry(5, asyncfn.onlyCallback(3));
      fn((err, res)=>{
        expect(err).to.be(null);
        expect(res).to.be(3);
        done();
      })
    });
    it('should accept `wait` options as the interval between requesets', function(done) {
      var fn = retry({times: 5, wait: 100}, asyncfn.onlyCallback(4));
      var start = Date.now();
      fn((err, res)=>{
        var diff = Date.now() - start;
        expect(diff).to.be.above(300);
        expect(err).to.be(null);
        expect(res).to.be(4);
        done();
      });
    });

  });

  describe('function returned', _=>{
    it('should return a function with same original async funciton args signature ', function(done) {
      var fn = retry(4, asyncfn.callbackMore(3));
      var arg = {};

      fn(arg, (err, cnt, _arg)=>{
        expect(err).to.be(null);
        expect(cnt).to.be(3);
        expect(_arg).to.be(arg);
        done();
      })
    });

    it('should callback successful response if it did in the first try', function(done) {
      var arg = {};
      var fn = retry(asyncfn.callbackMore(1));

      fn(arg, (err, cnt, _arg)=>{

        expect(err).to.be(null);
        expect(cnt).to.be(1);
        expect(_arg).to.be(arg);
        done();
      });
    });

    it('should callback error, if reach the `times` limitation', function(done) {
      var arg = {};
      var fn = retry(2, asyncfn.callbackMore(3));

      fn(arg, (err, cnt, _arg)=>{

        expect(err).to.be.an(Error);
        expect(err.message).to.be('2');
        expect(cnt).to.not.be.ok();
        expect(_arg).to.not.be.ok();
        done();
      });
    })


  });


});