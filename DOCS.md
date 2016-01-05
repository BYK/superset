# SuperSet

A library for ES6 that extends the built-in `Set` class to implement the missing fundamental methods such as `.map`,
`.filter` and `.reduce` in addition to basic set methods such as `.union` and `.isSubsetOf`.


## `map(func, thisArg)`

The `map()` method creates a new set with the results of calling a provided function on every element in this set.

### Parameters

#### func

Function that produces an element of the new set. Invoked with arguments `(element, element, setObj)`.

#### thisArg

*Optional.* Value to use as `this` when executing `func`. 

### Example

Mapping a set of numbers to a set of square roots

    var numbers = new SuperSet([1, 4, 9]);
    var roots = numbers.map(Math.sqrt);
    // roots is now SuperSet { 1, 2, 3 }, numbers is still SuperSet { 1, 4, 9 }

See [Array.prototype.map on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
for more examples.


## `filter(func, thisArg)`

The `filter()` method creates a new set with all elements that pass the test implemented by the provided function.

### Parameters

#### func

Function to test each element of the set. Invoked with arguments `(element, element, setObj)`. Return `true` to keep the
element, `false` otherwise.

#### thisArg

*Optional.* Value to use as `this` when executing `func`. 

### Example

Filtering out all small values

    function isBigEnough(value) {
        return value >= 10;
    }
    var filtered = new SuperSet([12, 5, 8, 130, 44]).filter(isBigEnough);
    // filtered is SuperSet { 12, 130, 44 }

See [Array.prototype.filter on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
for more examples.


## `union()`

The `union()` method returns a new set comprised of the set on which it is called joined with the sets provided as the
arguments.

### Example

Merging two sets

    var first3 = new SuperSet(['a', 'b', 'c']);
    var from2to5 = new SuperSet(['b', 'c', 'd', 'e']);
    
    var first5 = first3.union(from2to5);
    // first5 is SuperSet { 'a', 'b', 'c', 'd', 'e' }

See [Array.prototype.concat on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
for more examples.


## `every(func, thisArg)`

The `every()` method tests whether all elements in the set pass the test implemented by the provided function.

### Parameters

#### func

Function to test each element of the set. Invoked with arguments `(element, element, setObj)`.

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

The `find()` method returns a value in the set, if an element in the set satisfies the provided testing function.
Otherwise `undefined` is returned.

### Parameters

#### func

Function to test each element of the set. Invoked with arguments `(element, element, setObj)`.

#### thisArg

*Optional.* Value to use as `this` when executing `func`. 

### Example

Find a prime number in a set

    function isPrime(element, _, setObj) {
        let start = 2;
        
        while (start <= Math.sqrt(element)) {
            if (element % start++ < 1)
                return false;
        }
        
        return element > 1;
    }
    
    new SuperSet([4, 6, 8, 12]).find(isPrime);  // undefined, not found
    new SuperSet([4, 5, 8, 12]).find(isPrime);  // 5

See [Array.prototype.find on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
for more examples.


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
