"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrArr_1 = require("./StrArr");
const Anagrams_1 = require("./Anagrams");
it("should return map for Anagrams collection", () => {
    let firstRecord = new StrArr_1.StrArr("act,cat,tac");
    let m = new Map();
    m.set('act', firstRecord);
    let anagrams = new Anagrams_1.Anagrams(m);
    expect(anagrams.map.has('act')).toBe(true);
});
it("should return map for Anagrams collection", () => {
    let firstRecord = new StrArr_1.StrArr("act,cat,tac");
    let map = new Map();
    map.set('act', firstRecord);
    let anagrams = new Anagrams_1.Anagrams(map);
    expect(anagrams.map.get('act')).toEqual(firstRecord);
});
it("should return map for Anagrams collection", () => {
    let a = new Anagrams_1.Anagrams(new Map());
    expect(a.map.size).toBe(0);
});
