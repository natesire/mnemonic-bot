"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe("anagram finder", () => {
    it('should find anagram', () => {
        let anagram = new Anagram();
        expect(anagram('finder')).toContain('friend');
    });
});
