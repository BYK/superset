"use strict";

const path = require("path");
const chai = require("chai");
chai.use(require("dirty-chai"));

const expect = chai.expect;

const SuperSet = require(path.join(__dirname, "..", "index.js"));

describe("SuperSet", () => {
    let testSet, otherSetObj;

    beforeEach(() => {
        testSet = new SuperSet([1, 2, 3]);
        otherSetObj = new SuperSet([2, 3, 4, 5]);
    });

    describe("map", () => {
        it("should apply the transform function to all elements and return a new set", () => {
            const result = testSet.map(elem => elem * elem);

            expect(Array.from(result)).to.eql([1, 4, 9]);
        });

        it("should apply the transform function to using the provided context", () => {
            const context = { mul: 2 };
            const result = testSet.map(function (elem) { return elem * this.mul; }, context);

            expect(Array.from(result)).to.eql([2, 4, 6]);
        });
    });

    describe("union", () => {
        it("should return elements in both sets", () => {
            const result = testSet.union(otherSetObj);

            expect(Array.from(result)).to.eql([1, 2, 3, 4, 5]);
        });

        it("should return elements in all provided sets", () => {
            const result = testSet.union(otherSetObj, new SuperSet([6, 7]));

            expect(Array.from(result)).to.eql([1, 2, 3, 4, 5, 6, 7]);
        });
    });

    describe("every", () => {
        it("should return false if any of the elements in the set does not satisfy the condition", () => {
            expect(testSet.every(elem => elem > 1)).to.be.false();
        });

        it("should return true if all elements in the set satisfy the condition", () => {
            expect(testSet.every(elem => elem >= 1)).to.be.true();
        });

        it("should return false if no element in the set satisfies the condition", () => {
            expect(testSet.every(elem => elem < 1)).to.be.false();
        });

        it("should return true for empty set", () => {
            expect((new SuperSet()).every(elem => !elem)).to.be.true();
        });

        it("should use the provided context", () => {
            expect(testSet.every(function (elem) { return elem < this.pivot; }, { pivot: 2 })).to.be.false();
        });
    });

    describe("find", () => {
        it("should return the first element satisfying the condition", () => {
            const result = testSet.find(elem => elem > 1);

            expect(result).to.equal(2);
        });

        it("should use the provided context", () => {
            expect(testSet.find(function (elem) { return elem < this.pivot; }, { pivot: 2 })).to.equal(1);
        });
    });

    describe("join", () => {
        it("should have no separator with an empty set", () => {
            testSet.clear();

            expect(testSet.join("//sep//")).to.equal("");
        });

        it("should have no separator with a set having a single element", () => {
            testSet.clear();
            testSet.add(1);

            expect(testSet.join("//sep//")).to.equal("1");
        });

        it("should join using the separator provided", () => {
            expect(testSet.join("//sep//")).to.equal("1//sep//2//sep//3");
        });

        it("should join using ',' when no separator is provided", () => {
            expect(testSet.join()).to.equal("1,2,3");
        });
    });

    describe("first", () => {
        it("should return the first element", () => {
            testSet.clear();
            testSet.add(Math.PI);

            expect(testSet.first).to.equal(Math.PI);
        });
    });

    describe("reduce", () => {
        it("should reduce the elements using the function", () => {
            const result = testSet.reduce((accumulator, elem) => accumulator + elem);

            expect(result).to.equal(6);
        });

        it("should reduce the elements using the initial value", () => {
            const result = testSet.reduce((accumulator, elem) => accumulator + elem, 10);

            expect(result).to.equal(16);
        });

        it("should throw a TypeError on an empty set without an initial value", () => {
            const tester = () => new SuperSet().reduce((acc, elem) => acc + elem);

            expect(tester).to.throw(TypeError);
        });
    });

    describe("some", () => {
        it("should return true if any of the elements in the set satisfies the condition", () => {
            expect(testSet.some(elem => elem === 2)).to.be.true();
        });

        it("should return true if more than one element in the set satisfy the condition", () => {
            expect(testSet.some(elem => elem > 1)).to.be.true();
        });

        it("should return false if no element in the set satisfies the condition", () => {
            expect(testSet.some(elem => elem < 1)).to.be.false();
        });

        it("should return false for empty set", () => {
            expect((new SuperSet()).some(elem => !elem)).to.be.false();
        });

        it("should use the provided context", () => {
            expect(testSet.some(function (elem) { return elem < this.pivot; }, { pivot: 2 })).to.be.true();
        });
    });

    describe("isSubsetOf", () => {
        it("should return false when other set does not contain all elements of the source", () => {
            expect(testSet.isSubsetOf(otherSetObj)).to.be.false();
        });

        it("should return true for any empty set as the source", () => {
            expect((new SuperSet()).isSubsetOf(testSet)).to.be.true();
        });

        it("should return true for the same set", () => {
            expect(testSet.isSubsetOf(testSet)).to.be.true();
        });

        it("should return true when other set cover the source set", () => {
            otherSetObj.add(1);
            expect(testSet.isSubsetOf(otherSetObj)).to.be.true();
        });
    });

    describe("equals", () => {
        it("should return false for different sets", () => {
            expect(testSet.equals(otherSetObj)).to.be.false();
        });

        it("should return true for equivalent Sets", () => {
            expect(testSet.equals(new Set(testSet))).to.be.true();
        });

        it("should return true for equivalent SuperSets", () => {
            expect(testSet.equals(new SuperSet(testSet))).to.be.true();
        });

        it("should return false for same sized but different sets", () => {
            expect(testSet.equals(new SuperSet([2, 4, 6]))).to.be.false();
        });
    });

    describe("intersect", () => {
        it("should return elements only in both sets", () => {
            const result = testSet.intersect(otherSetObj);

            expect(Array.from(result)).to.eql([2, 3]);
        });
    });

    describe("subtract", () => {
        it("should return elements only in one set", () => {
            const result = testSet.subtract(otherSetObj);

            expect(Array.from(result)).to.eql([1]);
        });
    });

    describe("update", () => {
        it("should add all elements in the iterable", () => {
            testSet.update([1, 2, 3]);

            expect(Array.from(testSet)).to.eql([1, 2, 3]);
        });
    });

    describe("xor", () => {
        it("should return elements only in one set", () => {
            const result = testSet.xor(otherSetObj);

            expect(Array.from(result)).to.eql([1, 4, 5]);
        });
    });
});
