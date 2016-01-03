# SuperSet

A library for ES6 that extends the built-in `Set` class to implement the missing fundamental methods such as `.map`,
`.filter` and `.reduce` in addition to basic set methods such as `.union` and `.isSubsetOf`.

## `map(func, thisArg)`

The `map()` method creates a new set with the results of calling a provided function on every element in this set.

### Parameters

#### func

Function that produces an element of the new set. Invoked with arguments `(element, element, setobj)`.

#### thisArg

*Optional.* Value to use as `this` when executing `func`. 

### Example

Mapping a set of numbers to a set of square roots

    var numbers = new SuperSet([1, 4, 9]);
    var roots = numbers.map(Math.sqrt);
    // roots is now SuperSet{1, 2, 3}, numbers is still SuperSet{1, 4, 9}

See [Array.prototype.map on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
for more examples.


## `filter(func, thisArg)`

The `filter()` method creates a new set with all elements that pass the test implemented by the provided function.

### Parameters

#### func

Function to test each element of the set. Invoked with arguments `(element, element, setobj)`. Return `true` to keep the
element, `false` otherwise.

#### thisArg

*Optional.* Value to use as `this` when executing `func`. 

### Example

Filtering out all small values

    function isBigEnough(value) {
        return value >= 10;
    }
    var filtered = new SuperSet([12, 5, 8, 130, 44]).filter(isBigEnough);
    // filtered is SuperSet{12, 130, 44}

See [Array.prototype.filter on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
for more examples.

## `union(otherSetObj)`

The `union()` method returns a new set comprised of the set on which it is called joined with the set provided as the
argument.

### Example

Merging two sets

    var first3 = new SuperSet(['a', 'b', 'c']);
    var from2to5 = new SuperSet(['b', 'c', 'd', 'e']);
    
    var first5 = first3.union(from2to5);
    // first5 is SuperSet{'a', 'b', 'c', 'd', 'e'}

## `every(func, thisArg)`

The `every()` method tests whether all elements in the set pass the test implemented by the provided function.

### Parameters

#### func

Function to test each element of the set. Invoked with arguments `(element, element, setobj)`.

#### thisArg

*Optional.* Value to use as `this` when executing `func`. 

### Example

Testing size of all set elements

    function isBigEnough(value) {
      return value >= 10;
    }
    
    new SuperSet([12, 5, 8, 130, 44]).every(isBigEnough);    // false
    new SuperSet([12, 54, 18, 130, 44]).every(isBigEnough);  // true

See [Array.prototype.every on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
for more examples.


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
