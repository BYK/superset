# SuperSet

A library for ES6 that extends the built-in `Set` class to implement the missing fundamental methods such as `map()`,
`filter()` and `reduce()` in addition to basic set methods such as `union()` and `isSubsetOf()`.

## `map(func, thisArg)`

The `map()` method creates a new set with the results of calling a provided function on every element in this set.

### Parameters

#### func

Function that produces an element of the new set. Invoked with arguments `(element, element, setObj)`.

#### thisArg

*Optional.* Value to use as `this` when executing `func`. 

### Example

Mapping a set of numbers to a set of square roots

```js
let numbers = new SuperSet([1, 4, 9]);

numbers.map(Math.sqrt);  // → SuperSet { 1, 2, 3 }
```

See [Array.prototype.map on MDN][mdn-map-url] for more examples.

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

```js
new SuperSet([12, 5, 8, 130, 44]).filter(elem => elem >= 10);  // → SuperSet { 12, 130, 44 }
```

See [Array.prototype.filter on MDN][mdn-filter-url] for more examples.

## `union()`

The `union()` method returns a new set comprised of the set on which it is called joined with the sets provided as the
arguments.

### Example

Merging two sets

```js
var first3 = new SuperSet(["a", "b", "c"]);
var from2to5 = new SuperSet(["b", "c", "d", "e"]);

first3.union(from2to5);  // → SuperSet { "a", "b", "c", "d", "e" }
```

See [Array.prototype.concat on MDN][mdn-concat-url] for more examples.

## `every(func, thisArg)`

The `every()` method tests whether all elements in the set pass the test implemented by the provided function.

### Parameters

#### func

Function to test each element of the set. Invoked with arguments `(element, element, setObj)`.

#### thisArg

*Optional.* Value to use as `this` when executing `func`. 

### Example

Testing size of all set elements

```js
new SuperSet([12, 5, 8, 130, 44]).every(elem => elem >= 10);    // → false
new SuperSet([12, 54, 18, 130, 44]).every(elem => elem >= 10);  // → true
```

See [Array.prototype.every on MDN][mdn-every-url] for more examples.

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

```js
function isPrime(element, _, setObj) {
    let start = 2;

    while (start <= Math.sqrt(element)) {
        if (element % start++ < 1)
            return false;
    }

    return element > 1;
}

new SuperSet([4, 6, 8, 12]).find(isPrime);  // → undefined
new SuperSet([4, 5, 8, 12]).find(isPrime);  // → 5
```

See [Array.prototype.find on MDN][mdn-find-url] for more examples.

## `join(separator)`

The `join()` method joins all elements of a set into a string.

### Parameters

#### separator

*Optional.* Specifies a string to separate each element of the set. The separator is converted to a string if necessary.
If omitted, the set elements are separated with a comma. If `separator` is an empty string, all elements are joined
without any characters in between them.

### Example

Joining a set four different ways

```js
const events = new SuperSet(["Wind", "Rain", "Fire"]);

events.join();       // → "Wind,Rain,Fire"
events.join(", ");   // → "Wind, Rain, Fire"
events.join(" + ");  // → "Wind + Rain + Fire"
events.join("");     // → "WindRainFire"
```

See [Array.prototype.join on MDN][mdn-join-url] for more examples.

## `first`

Provides the first element in the set. Since sets are not indexable, it simply gives the first element obtained from a 
regular iteration is returned.

### Example

A deterministic example with a single-element set

```js
let singleElementSet = new SuperSet([42]);
singleElementSet.first;  // → 42
```

## `reduce(func, initialValue)`

The `reduce()` method applies a function against an accumulator and each value of the set (in no particular order) to
reduce it to a single value.

### Parameters

#### func

Function to execute on each value in the set. Invoked with arguments `(accumulator, element, element, setObj)`.

#### initialValue

*Optional.* Value to use as the first argument to the first call of the callback. 

### Example

Sum all the values of a set

```js
new SuperSet([0, 1, 2, 3]).reduce((total, elem) => total + elem);  // → 6
```

See [Array.prototype.reduce on MDN][mdn-reduce-url] for more examples.

## `some(func, thisArg)`

The `some()` method tests whether some element in the array passes the test implemented by the provided function.

### Parameters

#### func

Function to test each element of the set. Invoked with arguments `(element, element, setObj)`.

#### thisArg

*Optional.* Value to use as `this` when executing `func`. 

### Example

Testing if any element in set is larger than or equal to 10

```js
new SuperSet([2, 5, 8, 1, 4]).some(elem => elem > 10);  // → false
new SuperSet([12, 5, 8, 1, 4]).some(elem => elem > 10);  // → true
```

See [Array.prototype.some on MDN][mdn-some-url] for more examples.

## `isSubsetOf(otherSetObj)`

The `isSubsetOf()` method determines whether a set is a subset of a certain set. Returns `true` or `false` as 
appropriate. 

### Example

```js
let nums = new SuperSet([0, 1, 2, 3, 4]);
let even = new SuperSet([0, 2, 4]);

even.isSubsetOf(nums);  // → true
even.isSubsetOf(even);  // → true
nums.isSubsetOf(even);  // → false
```

## `equals(otherSetObj)`

The `equals()` method determines whether a set is a equal to a certain set. Returns `true` or `false` as appropriate. 

### Example

```js
let set1 = new SuperSet([0, 1, 2]);
let set2 = new SuperSet([1, 2]);

set1.equals(set2);  // → false
set2.equals(set1);  // → false
set1.equals(set1);  // → true

set2.add(0);
set1.equals(set2);  // → true
set2.equals(set1);  // → true
```

## `intersect(otherSetObj)`

The `intersect()` method returns the intersection of a set with another set.

### Example

```js
let nums = new SuperSet([3, 4, 5, 6]);
let primes = new SuperSet([2, 3, 5, 7]);

nums.intersect(primes);  // → SuperSet { 3, 5 }
```

## `subtract(otherSetObj)`

The `subtract()` method returns the elements in a set that are not in the other set provided.

### Example

```js
let nums = new SuperSet([3, 4, 5, 6]);
let primes = new SuperSet([2, 3, 5, 7]);

nums.subtract(primes);  // → SuperSet { 4, 6 }
```

## `update(iterable)`

The `update()` methods adds all the elements from the provided iterable to the set.

### Example

```js
let nums = new SuperSet([0, 1, 2]);
nums.update([2, 4, 6]);  // → SuperSet { 0, 1, 2, 4, 6 }
```

## `xor(otherSetObj)`

The `xor()` method returns a new set containing only the elements occur in one of the two sets.

### Example

```js
let nums = new SuperSet([3, 4, 5, 6]);
let primes = new SuperSet([2, 3, 5, 7]);

nums.xor(primes);  // → SuperSet { 4, 6, 2, 7 }
```

---

Parts of this documentation are adapted from [MDN][mdn-url]. 

[![Creative Commons License][creative-commons-image]][creative-commons-license]  
This work is licensed under a 
[Creative Commons Attribution-ShareAlike 4.0 International License][creative-commons-license].

[creative-commons-license]: http://creativecommons.org/licenses/by-sa/4.0/
[creative-commons-image]: https://i.creativecommons.org/l/by-sa/4.0/88x31.png
[mdn-map-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[mdn-filter-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[mdn-concat-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
[mdn-every-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
[mdn-find-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
[mdn-join-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
[mdn-reduce-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
[mdn-some-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
[mdn-url]: https://developer.mozilla.org
