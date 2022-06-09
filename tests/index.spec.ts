import anagram from './anagram';

describe("anagram finder", () => {
    it('should find anagram', () => {
        let anagram = new Anagram();
        expect(anagram('finder')).toContain('friend');
    });
});