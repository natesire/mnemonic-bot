import { Anagram } from '../source/anagram.js';

describe("anagram finder", () => {
    it('should find anagram', () => {
        let anagram = new Anagram('dictionary.txt');
        expect(anagram.find('finder')).toContain('friend');
    });
});