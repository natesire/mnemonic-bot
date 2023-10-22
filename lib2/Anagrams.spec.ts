import { StrArr } from "./StrArr";
import { Anagrams } from "./Anagrams";

it("should return map for Anagrams collection", () => {
    let firstRecord = new StrArr("act,cat,tac");
    let m = new Map();
    m.set('act', firstRecord);
    let anagrams = new Anagrams(m);
    expect(anagrams.map.has('act')).toBe(true);
});

it("should return map for Anagrams collection", () => {
    let firstRecord = new StrArr("act,cat,tac");
    let map = new Map();
    map.set('act', firstRecord);
    let anagrams = new Anagrams(map);
    expect(anagrams.map.get('act')).toEqual(firstRecord);
});