"use strict";

function* mapGen(setObj, transform) {
    for (const itm of setObj)
        yield transform(itm, itm, setObj);
}

function* filterGen(setObj, filter) {
    for (const itm of setObj) {
        if (filter(itm, itm, setObj))
            yield itm;
    }
}

function* subtractGen(set1, set2) {
    for (const itm of set1) {
        if (!set2.has(itm))
            yield itm;
    }
}

function* unionGen(set1, set2) {
    yield* set1;
    yield* set2;
}

function* xorGen(set1, set2) {
    yield* unionGen(
        subtractGen(set1, set2),
        subtractGen(set2, set1)
    );
}

class SuperSet extends Set {
    map(func, thisArg) {
        return new SuperSet(mapGen(this, func.bind(thisArg)));
    }

    filter(func, thisArg) {
        return new SuperSet(filterGen(this, func.bind(thisArg)));
    }

    union(otherSetObj) {
        return new SuperSet(unionGen(this, otherSetObj));
    }

    every(func, thisArg) {
        const check = func.bind(thisArg);
        for (const itm of this) {
            if (!check(itm, itm, this))
                return false;
        }

        return true;
    }

    find(func, thisArg) {
        const check = func.bind(thisArg);
        for (const itm of this) {
            if (check(itm, itm, this))
                return itm;
        }
    }

    join(separator) {
        return Array.from(this).join(separator);
    }

    get first() {
        return this[Symbol.iterator]().next().value;
    }

    reduce(func, initialValue) {
        if (arguments.length < 2 && this.size === 0)
            throw new TypeError("An initial value is required when using an empty set.");

        const iterator = this[Symbol.iterator]();
        let result = arguments.length === 1 ? iterator.next().value : initialValue;

        for (const itm of iterator)
            result = func(result, itm, itm, this);

        return result;
    }

    some(func, thisArg) {
        const check = func.bind(thisArg);
        for (const itm of this) {
            if (check(itm, itm, this))
                return true;
        }

        return false;
    }

    isSubsetOf(otherSetObj) {
        return this.every(otherSetObj.has, otherSetObj);
    }

    equals(otherSetObj) {
        return this.size === otherSetObj.size && this.isSubsetOf(otherSetObj);
    }

    intersect(otherSetObj) {
        return this.filter(otherSetObj.has, otherSetObj);
    }

    subtract(otherSetObj) {
        return this.filter(itm => !otherSetObj.has(itm));
    }

    update(iterable) {
        for (const itm of iterable)
            this.add(itm);

        return this;
    }

    xor(otherSetObj) {
        return new SuperSet(xorGen(this, otherSetObj));
    }
}

module.exports = SuperSet;
