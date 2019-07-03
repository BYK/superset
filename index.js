"use strict";

/**
 * The callback type used by the `map()` method.
 *
 * @callback mapper
 * @param {*} element The element being processed
 * @param {*} key The element being processed again, since sets don't have keys
 * @param {SuperSet} setObj The set instance being worked on
 * @returns {*} The processed item
 */

/**
 * The callback used by methods `filter()`, `some()` and `find()`.
 *
 * @callback tester
 * @param {*} element The element being tested
 * @param {*} key The element being tested again, since sets don't have keys
 * @param {SuperSet} setObj The set instance being worked on
 * @returns {Boolean} The result of the test
 */

/**
 * The callback type used by the `reduce()` method.
 *
 * @callback reductionProcessor
 * @param {*} accumulator The current accumulator value
 * @param {*} item The element being processed
 * @param {*} key The element being processed again, since sets don't have keys
 * @param {SuperSet} setObj The set instance being worked on
 * @returns {*} The new value of the accumulator
 */

/**
 * Generator that implements `map()`. Passed to SuperSet/Set constructor for efficiency from the actual `map()` method.
 *
 * @param {Set} setObj The set object to be transformed
 * @param {mapper} transform Transform function to be applied to each element in the set
 * @returns {Generator} A stream of transformed items.
 */
function* mapGen(setObj, transform) {
    for (const itm of setObj)
        yield transform(itm, itm, setObj);
}

/**
 * Generator that implements `filter()`. Passed to SuperSet/Set constructor for efficiency from the actual `filter()`
 * method.
 *
 * @param {Set} setObj The set object to be filtered
 * @param {tester} filter Filter function to be applied to each element in the set
 * @returns {Generator} A stream of filtered items.
 */
function* filterGen(setObj, filter) {
    for (const itm of setObj) {
        if (filter(itm, itm, setObj))
            yield itm;
    }
}

/**
 * Generator that implements set subtraction. Used by the `subtract()` method and other helpers.
 * @param {Set} set1 The set to be subtracted from.
 * @param {Set} set2 The set that is going to be subtracted.
 * @returns {Generator} A stream of items in the resultant set.
 */
function* subtractGen(set1, set2) {
    for (const itm of set1) {
        if (!set2.has(itm))
            yield itm;
    }
}

/**
 * Generator that simply yields all items from the provided sets.
 * @param {...Set} sets The sets to be chained
 * @returns {Generator} A stream of items from all provided sets.
 */
function* chain() {
    for (const setObj of arguments)
        yield* setObj;
}

/**
 * Generator that implements the XOR operation between two sets: yielding only items existing in one set.
 * @param {Set} set1 The first set for XOR.
 * @param {Set} set2 The second set for XOR.
 * @returns {Generator} A stream of items that only occur in one of the provided two sets.
 */
function* xorGen(set1, set2) {
    yield* chain(
        subtractGen(set1, set2),
        subtractGen(set2, set1)
    );
}

/**
 * A more capable `Set` type that implements essential collection methods such as `map()`, `filter()` and `reduce()` in
 * addition to basic set methods such as `union()`, `isSubsetOf()` etc. extending the built-in `Set` type.
 */
class SuperSet extends Set {
    /**
     * Applies the provided transforming `func` to all elements in the set and returns a new set with the return values.
     *
     * @param {mapper} func The transform function for each element in the set.
     * @param {Object} [thisArg] The context object to be bound to the provided transform `func`.
     * @returns {SuperSet} The set of transformed items.
     */
    map(func, thisArg) {
        return new SuperSet(mapGen(this, func.bind(thisArg)));
    }

    /**
     * Applies the provided filter `func` to all elements in the set and returns a new set with the returned, filtered
     * elements.
     *
     * @param {tester} func The filter/test function for each element in the set.
     * @param {Object} [thisArg] The context object to be bound to the provided test `func`.
     * @returns {SuperSet} The set of items that passes the test/filter.
     */
    filter(func, thisArg) {
        return new SuperSet(filterGen(this, func.bind(thisArg)));
    }

    /**
     * Merges the set with all provided sets and returns a new set as the result. Equivalent of the mathematical "union"
     * operation.
     *
     * @param {...Set} sets The sets to be merged/unioned with.
     * @returns {SuperSet} The resultant union set.
     */
    union() {
        const sets = Array.from(arguments);
        sets.unshift(this);

        return new SuperSet(chain.apply(undefined, sets));
    }

    /**
     * Applies the provided `func` to all items in the set. Returns `true` if all items result in a "truthy" value,
     * `false` otherwise.
     *
     * @param {tester} func The "test" function that will be applied to each item in the set.
     * @param {Object} [thisArg] The context object to be bound to the provided transform `func`.
     * @returns {boolean} `true` if all items "pass the test", `false` otherwise.
     */
    every(func, thisArg) {
        const check = func.bind(thisArg);
        for (const itm of this) {
            if (!check(itm, itm, this))
                return false;
        }

        return true;
    }

    /**
     * Applies the provided `func` to all items in the set and returns the first one that makes it return a "truthy"
     * value.
     *
     * @param {tester} func The "test" function to be applied to items in the set.
     * @param {Object} [thisArg] The context object to be bound to the provided transform `func`.
     * @returns {*} The first item from the set that "passes the test".
     */
    find(func, thisArg) {
        const check = func.bind(thisArg);
        for (const itm of this) {
            if (check(itm, itm, this))
                return itm;
        }
    }

    /**
     * Equivalent of `Array.prototype.join` for sets. Coerces and concatenates all items in the set using the provided
     * `separator`.
     *
     * @param {string} separator The "glue" to join items in the set with.
     * @returns {string} The resultant string from the concatenation.
     */
    join(separator) {
        return Array.from(this).join(separator);
    }

    /**
     * Reduces all items in the set using the provided reducing `func`. Equivalent of `Array.prototype.reduce`.
     * @param {reductionProcessor} func The reducing function.
     * @param {*} [initialValue] The initial value for the accumulator. When `reduce` is called on a non-empty set, the
     *                           first value of the set is used as the default value.
     * @returns {*} The result of the whole reduce operation.
     */
    reduce(func, initialValue) {
        /* eslint-disable no-magic-numbers */
        if (arguments.length < 2 && this.size === 0)
            throw new TypeError("An initial value is required when using an empty set.");

        const iterator = this[Symbol.iterator]();
        let result = arguments.length === 1 ? iterator.next().value : initialValue;

        for (const itm of iterator)
            result = func(result, itm, itm, this);

        return result;
    }

    /**
     * Applies the provided `func` to all items in the set. Returns `true` if any one of results in a "truthy" value,
     * `false` otherwise.
     *
     * @param {tester} func The "test" function that will be applied to each item in the set.
     * @param {Object} [thisArg] The context object to be bound to the provided transform `func`.
     * @returns {boolean} `true` if one of the items in the set "passes the test", `false` otherwise.
     */
    some(func, thisArg) {
        const check = func.bind(thisArg);
        for (const itm of this) {
            if (check(itm, itm, this))
                return true;
        }

        return false;
    }

    /**
     * Returns `true` if the current set instance is a subset of the provided set instance. Mathematical equivalent of
     * the subset test.
     *
     * @param {Set} otherSetObj The set that is expected to be the superset of the current set.
     * @returns {boolean} `true` if `otherSetObj` is a superset, `false` otherwise.
     */
    isSubsetOf(otherSetObj) {
        return this.every(otherSetObj.has, otherSetObj);
    }

    /**
     * Returns `true` if provided set is mathematically equal to the provided set.
     *
     * @param {Set} otherSetObj The set to be tested against for equality.
     * @returns {boolean} `true` if two sets are equal, `false` otherwise.
     */
    equals(otherSetObj) {
        return this.size === otherSetObj.size && this.isSubsetOf(otherSetObj);
    }

    /**
     * Returns a new set instance which contains the items from the intersection of the current set instance and the
     * provided set. Mathematical equivalent of set intersection.
     *
     * @param {Set} otherSetObj The set instance to be intersected with.
     * @returns {SuperSet} The intersection set of the two sets.
     */
    intersect(otherSetObj) {
        return this.filter(otherSetObj.has, otherSetObj);
    }

    /**
     * Returns a new set instance which contains the items that are not in the provided set. Mathematical equivalent of
     * set subtraction.
     *
     * @param {Set} otherSetObj The set to be subtracted.
     * @returns {SuperSet} The subtraction set for the A - B set operation where A is the current set instance.
     */
    diff(otherSetObj) {
        return new SuperSet(subtractGen(this, otherSetObj));
    }

    /**
     * Adds all items from the provided iterable to the current set.
     *
     * @param {Iterable} iterable The iterable containing the items to be added to the current set.
     * @returns {SuperSet} The current set instance, but updated in-place.
     */
    update(iterable) {
        for (const itm of iterable)
            this.add(itm);

        return this;
    }

    /**
     * Returns a new set instance which contains the items that exists only in one of the sets provided. Mathematical
     * equivalent of set XOR operation.
     *
     * @param {Set} otherSetObj The set to be used in the XOR operation.
     * @returns {SuperSet} The resultant set for the A ^ B set operation where A is the current set instance.
     */
    symmetricDiff(otherSetObj) {
        return new SuperSet(xorGen(this, otherSetObj));
    }

    /**
     * The discard() method deletes the iterable elements from the set and return the updated elements.
     *
     * @param {Iterable} iterable It contains iterable elements to be deleted from the current set.
     * @returns {SuperSet} It returns the current state of the set after the deleted elements.
     */

    discard(iterable) {
        for (const itm of iterable)
            this.delete(itm);

        return this;
    }
}

module.exports = SuperSet;
