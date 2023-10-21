import { StrArr } from "./StrArr";
import { Anagrams } from "./Anagrams";

it("should return map for Anagrams collection", () => {
    let firstRecord = new StrArr("act,cat,tac");
    let anagrams = new Anagrams(new Map<string, StrArr>([["act", firstRecord]]));
    expect(anagrams.map.has('act')).toBe(true);
});

it("should return map for Anagrams collection", () => {
    let firstRecord = new StrArr("act,cat,tac");
    let anagrams = new Anagrams(new Map<string, StrArr>([["act", firstRecord]]));
    expect(anagrams.map.get('act')).toBe(firstRecord);
});