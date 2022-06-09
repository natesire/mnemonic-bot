import { Anagram } from '../source/anagram.js';

describe("should find anagram of", () => {
    it('finder -> friend', () => {
        let anagram = new Anagram('dictionary.txt');
        expect(anagram.find('finder')).toContain('friend');
    });

    it('friend -> finder', () => {
        let anagram = new Anagram('dictionary.txt');
        expect(anagram.find('friend')).toContain('finder');
    });
});