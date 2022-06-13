import { Anagram } from '../source/anagram.js';

describe("should find anagram", () => {

  let anagram: Anagram;

  beforeAll(() => {
    anagram = new Anagram('dictionary.txt');
  });

  it('should throw error if file does not exist', () => {
    expect(() => {
      new Anagram('/path/to/file/that/does/not/exist.txt');
    }).toThrowError('File not found!');
  });

  it('should load dictionary', () => {
    const dictionary = anagram.loadDictionaryIntoArray();
    expect(dictionary).toContain('iceman'); // normalize all to lower case
  });

  // test the final result is less brittle
  it('gets cinema for iceman', () => {
    expect(anagram.findAnagrams('iceman')).toContain('cinema');
  });

  it('gets iceman for cinema', () => {
    expect(anagram.findAnagrams('cinema')).toContain('iceman');
  });
});