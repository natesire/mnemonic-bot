import { Anagram } from "./Anagram";
it("should return true if two words are anagrams", () => {
    let ana = new Anagram(["cat", "act"]);
    expect(ana.arr.sort()).toEqual(["act", "cat"]);
});