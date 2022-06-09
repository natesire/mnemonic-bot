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

    it('should cover edge case, extra repeat letter', () => {
      let anagram = new Anagram('dictionary.txt');
      let wordOneChars = 'friend'.split('');
      let wordTwoChars = 'rfiends'.split('');
      expect(anagram.matchScrambled('friends', 'rfiend')).toEqual(false)
    });
});