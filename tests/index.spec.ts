import { Anagram } from '../source/anagram.js';

describe("should find anagram of", () => {
    it('ifnder -> finder', () => {
      let anagram = new Anagram('dictionary.txt');
      expect(anagram.find('friend')).toContain('finder');
    });

    it('should factorialize 5 to 120', () => {
      let anagram = new Anagram('dictionary.txt');
      expect(anagram.factorialize(5)).toBe(120);
    });

    it('should return first permutation', () => {
      let anagram = new Anagram('dictionary.txt');
      expect(anagram.swap(0, 1, 'friend')).toContain('rfiend');
    });
});