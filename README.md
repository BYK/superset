# superset [![NPM version][npm-image]][npm-url] [![Build Status][gha-image]][gha-url] [![Coverage Status][coveralls-image]][coveralls-url]

A library for ES6 that extends the built-in `Set` class to implement the missing fundamental methods such as `map()`,
`filter()` and `reduce()` in addition to basic set methods such as `union()` and `isSubsetOf()`.

## Install from NPM

```sh
npm install superset --save
```

## Use

```js
"use strict";

const SuperSet = require("superset");
const numbers = new SuperSet([1, 2, 3, 4, 5]);
const evenNumbers = numbers.filter(num => num % 2 === 0);  // SuperSet { 2, 4 }

evenNumbers.isSubsetOf(numbers);  // true

numbers.diff(evenNumbers);  // SuperSet { 1, 3, 5 }
```

## Docs

You can [check out the docs](https://superset.readthedocs.org/en/latest/) or refer to the `Array` methods on
[MDN](https://developer.mozilla.org) for further information. The code is also documented using JSDoc.

[npm-image]: https://img.shields.io/npm/v/superset.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/superset
[gha-image]: https://github.com/BYK/superset/workflows/Build/badge.svg
[gha-url]: https://github.com/BYK/superset/actions?query=workflow%3ABuild
[coveralls-image]: https://img.shields.io/coveralls/BYK/superset/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/BYK/superset?branch=master
