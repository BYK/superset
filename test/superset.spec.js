"use strict";

const path = require("path");
const expect = require("chai").expect;

const SuperSet = require(path.join(__dirname, "..", "index.js"));

describe("SuperSet", () => {
    let testSet;

    beforeEach(() => {
        testSet = new SuperSet();
    });

    describe("first", () => {
        it("returns the first element", () => {
            testSet.add(3.14);
            expect(testSet.first).to.equals(3.14);
        });
    });
});
