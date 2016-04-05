'use strict';

/**
 *
 * // options
 * {
 *   times: {UInt} - retry limit, default: 3
 *   wait:  {UInt} - milliseconds to wait, default: 0
 * }
 *
 * @param {Number|Object} [options] - default `times`: 3, `wait`: 0
 * @param {Function} fn  - Async function
 * @returns {Function}   - Same as async function, but allow to retry
 */
module.exports = function(options, fn) {

  if (typeof options == 'function') {
    fn = options;
    options = {times: 3, wait: 0};
  }
  if (typeof options == 'number') options = {times: options, wait: 0};
  if (options !== Object(options)) options = { times: 3, wait: 0 };

  var times = isUInt(options.times) && options.times > 0 ? options.times : 3;
  var wait = isUInt(options.wait) ? options.wait : 0;

  return function(){

    var cnt = times;
    var args = Array.prototype.slice.call(arguments);
    var cb = args.pop();

    if (typeof cb != 'function') cb = nop;
    args.push(done);

    task();

    function task() {
      fn.apply(null, args);
    }

    function done() {

        var _args = Array.prototype.slice.call(arguments);
        var _err = _args.shift();

        if (_err) {
          if (--cnt > 0 ) return setTimeout(task, wait);
          return cb(_err);
        }

        _args = [null].concat(_args);
        cb.apply(null, _args);
    }

  };

};

function nop(){}

function isUInt(n) {
  return /^\d+$/.test(n);
}