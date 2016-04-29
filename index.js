'use strict';

/*
 * Module dependencies.
 */

var each = require('@ndhoule/each');

/**
 * Check if a predicate function returns `true` for any value in a `collection`.
 * Checks owned, enumerable values and returns as soon as `predicate` returns
 * true.
 *
 * @name some
 * @param {Function} predicate The function used to test values.
 * @param {Array|Object|string} collection The collection to search.
 * @return {boolean} True if a value passes the predicate test, otherwise false.
 * @example
 * var isEven = function(num) { return num % 2 === 0; };
 *
 * some(isEven, [1, 2, 3]); // => true
 * some(isEven, [1, 3, 5]); // => false
 * some(isEven, [2, 4, 6]); // => true
 */
var some = function some(predicate, collection) {
  if (typeof predicate !== 'function') {
    throw new TypeError('`predicate` must be a function but was a ' + typeof predicate);
  }

  var result = false;

  each(function(val, key, collection) {
    if (predicate(val, key, collection)) {
      result = true;
      // Exit enumeration early
      return false;
    }
  }, collection);

  return result;
};

/*
 * Exports.
 */

module.exports = some;
