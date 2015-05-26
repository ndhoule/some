'use strict';

/**
 * Module dependencies.
 */

var assert = require('assert');
var some = require('../');
var sinon = require('sinon');

/**
 * Tests.
 */

describe('some', function() {
  var always = function(val) {
    return function() {
      return val;
    };
  };
  var equal = function(val) {
    return function(val2) {
      return val === val2;
    };
  };
  var isEven = function(num) { return num % 2 === 0; };

  it('should be a function', function() {
    assert.equal(typeof some, 'function');
  });

  it('should have an arity of 2', function() {
    assert.equal(some.length, 2);
  });

  it('should return false for an empty collection', function() {
    assert(some(always(true), []) === false);
    assert(some(always(true), {}) === false);
    assert(some(always(true), '') === false);
  });

  it('should return false when no elements pass the predicate function', function() {
    assert(some(isEven, [1, 3, 5]) === false);
    assert(some(isEven, { a: 1, b: 3, c: 5 }) === false);
    assert(some(equal('a'), 'bcd') === false);
  });

  it('should return true when at least one elements passes the predicate function', function() {
    assert(some(isEven, [2, 3, 5]) === true);
    assert(some(isEven, [1, 2, 5]) === true);
    assert(some(isEven, [1, 3, 4]) === true);
    assert(some(isEven, [2, 4, 6]) === true);
    assert(some(isEven, { a: 2, b: 3, c: 5 }) === true);
    assert(some(isEven, { a: 1, b: 2, c: 5 }) === true);
    assert(some(isEven, { a: 1, b: 3, c: 4 }) === true);
    assert(some(isEven, { a: 2, b: 4, c: 6 }) === true);
    assert(some(equal('a'), 'a') === true);
    assert(some(equal('a'), 'abcd') === true);
    assert(some(equal('a'), 'abacd') === true);
    assert(some(equal('a'), 'bcda') === true);
  });

  it('should pass the value/key/collection to the predicate function', function() {
    var spy = sinon.spy();
    var collection = { a: 2, b: 3, c: 5 };

    some(spy, collection);

    assert(spy.callCount === 3);
    assert(spy.calledWithExactly(2, 'a', collection));
    assert(spy.calledWithExactly(3, 'b', collection));
    assert(spy.calledWithExactly(5, 'c', collection));
  });

  it('should throw an error when passed a non-function `predicate`', function() {
    assert.throws(
      function() { some('omg', [1, 2, 3]); },
      /be a function/
    );
  });
});
