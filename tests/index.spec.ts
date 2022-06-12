import { Anagram } from '../source/anagram.js';

describe("should find anagram", () => {

  let anagram: Anagram;

  beforeAll(() => {
    anagram = new Anagram('dictionary.test.txt');
  });

  it('should throw error if file does not exist', () => {
    expect(() => {
      new Anagram('/path/to/file/that/does/not/exist.txt');
    }).toThrowError('File not found!');
  });

  it('should load dictionary', () => {
    const dictionary = anagram.loadDictionaryIntoArray();
    expect(dictionary).toContain('Aaron'); // normalize all to lower case
  });
  
  it('should sort word', () => {
    expect(anagram.sortWord('aardwolf')).toEqual('aadflorw');
  });

  it('gets value for key', () => {
    const dictionary = anagram.loadDictionaryIntoArray();
    let sortedDictionary = anagram.sortDictionaryWords(dictionary);
    console.log(sortedDictionary);
    expect(sortedDictionary.get('aaadkrrv')).toBe('aardvark,aaadkrrv'); // aardvark -> aadkrrvab
  });

  it('gets value for key for three words', () => {
    const dictionary = anagram.loadDictionaryIntoArray();
    let sortedDictionary = anagram.sortDictionaryWords(dictionary);
    console.log(sortedDictionary);
    expect(sortedDictionary.get('aaadkrrv')).toBe('aardvark,aaadkrrv,aardvark,aaadkrrv'); // aardvark -> aadkrrvab
  });

  it('gets cinema for iceman', () => {
    expect(anagram.findAnagrams('iceman')).toContain('cinema');
  });

  it('gets iceman for cinema', () => {
    expect(anagram.findAnagrams('cinema')).toContain('iceman');
  });
});