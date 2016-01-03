# SuperSet

A library for ES6 that extends the built-in `Set` class to implement the missing fundamental methods such as `.map`,
`.filter` and `.reduce` in addition to basic set methods such as `.union` and `.isSubsetOf`.

## `map(func, thisArg)`

The `map()` method creates a new set with the results of calling a provided function on every element in this set.

`map` calls a provided callback function once for each element in a set, and constructs a new set from the results.

`func` is invoked with three arguments: the value of the element, the value of the element again since that is the
"key", and the `SuperSet` object being traversed.

If a `thisArg` parameter is provided to `map`, it will be passed to `func` when invoked, for use as its `this` value.
Otherwise, the value `undefined` will be passed for use as its `this` value. The `this` value ultimately observable by
`func` is determined according to the usual rules for determining the `this` seen by a function.

`map` does not mutate the set on which it is called (although `func`, if invoked, may do so).

### Parameters

#### func

Function that produces an element of the new set, taking three arguments:

**currentValue**: The current element being processed in the set.  
**index**: The index of the current element being processed in the set.  
**setobj**: The set map was called upon.  

#### thisArg

*Optional.* Value to use as this when executing callback. 

### Example

Mapping a set of numbers to a set of square roots

    var numbers = new SuperSet([1, 4, 9]);
    var roots = numbers.map(Math.sqrt);
    // roots is now SuperSet{1, 2, 3}, numbers is still SuperSet{1, 4, 9}

See [Array.prototype.map on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
for more examples.


## `filter(func, thisArg)`

## `union(otherSetObj)`

## `every(func, thisArg)`

## `find(func, thisArg)`

## `join(separator)`

## `first`

## `reduce(func, initialValue)`

## `some(func, thisArg)`

## `isSubsetOf(otherSetObj)`

## `equals(otherSetObj)`

## `intersect(otherSetObj)`

## `subtract(otherSetObj)`

## `update(iterable)`

## `xor(otherSetObj)`


---

Parts of this documentation are adapted from [MDN](https://developer.mozilla.org). 

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)  
This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
