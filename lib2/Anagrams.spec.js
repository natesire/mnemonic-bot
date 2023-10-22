"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrArr_1 = require("./StrArr");
const Anagrams_1 = require("./Anagrams");
it("should return map for Anagrams collection", () => {
    let firstRecord = new StrArr_1.StrArr("act,cat,tac");
    let ana = new Map([["act", firstRecord]]);
    let anagrams = new Anagrams_1.Anagrams(ana);
    expect(anagrams.map.has('act')).toBe(true);
});
it("should return map for Anagrams collection", () => {
    let firstRecord = new StrArr_1.StrArr("act,cat,tac");
    let anagrams = new Anagrams_1.Anagrams(new Map([["act", firstRecord]]));
    expect(anagrams.map.get('act')).toBe(firstRecord);
});
