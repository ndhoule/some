# some [![CI][ci-badge]][ci-link]

Check if a `predicate` function returns true for any value in a `collection`.

## Installation

```sh
$ component install ndhoule/some
$ npm install @ndhoule/some
```

## API

### `some(predicate : Function, collection : Array|Object|String)`

```js
var isEven = function(num) { return num % 2 === 0; };

some(isEven, [1, 2, 3]); // => true
some(isEven, [1, 3, 5]); // => false
some(isEven, [2, 4, 6]); // => true
```

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/some
[ci-badge]: https://travis-ci.org/ndhoule/some.svg?branch=master
