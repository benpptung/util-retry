'use strict';

exports.onlyCallback = function(n) {

  var cnt = 0;

  return function(cb) {
    if (++cnt >= n) return setImmediate(_=> cb(null, cnt));
    setImmediate(_=> cb(new Error(`${cnt}`)));
  };
};

exports.callbackMore = function(n) {
  var cnt = 0;

  return function(arg, cb) {
    if (++cnt >= n) return setImmediate(_=> cb(null, cnt, arg));
    setTimeout(_=> cb(new Error(`${cnt}`)));
  }
};