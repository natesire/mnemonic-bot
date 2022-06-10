import { Anagram } from '../source/anagram.js';

describe("should find anagram", () => {

  it('should throw error if file does not exist', () => {
    expect(() => {
      new Anagram('/path/to/file/that/does/not/exist.txt');
    }).toThrowError('File not found!');
  });

  it('should load dictionary', () => {
    let anagram = new Anagram('./dictionary.txt');
    expect(anagram.dictionary).toContain('Aaron'); // normalize all to lower case
  });

  it('should factorialize 0 to 1', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.factorialize(0)).toBe(1);
  });

  it('should factorialize 1 to 1', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.factorialize(1)).toBe(1);
  });

  it('should factorialize 5 to 120', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.factorialize(5)).toBe(120);
  });

  it('should find extra char s', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.matchScrambled('friend', 'frient')).toEqual(1);
  });

  it('should find diff char t', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.matchScrambled('frient', 'friend')).toEqual(1);
  });

  it('should find repeat d, edge case', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.matchScrambled('friendd', 'friend')).toEqual(1);
  });

  it('should find fingerprint of word ab', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.fingerprint('ab')).toEqual(6);
  });

  it('should find fingerprint of word xyz', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.fingerprint('xyz')).toEqual(871933);
  });

  it('should find fingerprint of word', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.fingerprint('abcdef')).toEqual(30_030);
  });

  it('should find same fingerprint for scrambled', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.fingerprint('fbcdea')).toEqual(30_030); // 11 digit format
  });

  it('should find max fingerprint value before breaking apart', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.fingerprint('zzzzz')).toEqual(10_510_100_501); // 11 digit format
  });

  it('should find max fingerprint value before breaking apart', () => {
    let anagram = new Anagram('dictionary.txt');
    let inputWord = 'abc';
    let dictionaryWord = 'def';
    expect(anagram.fingerprint(inputWord)).toEqual(30); // 11 digit format
    expect(anagram.fingerprint(dictionaryWord)).toEqual(1001); // 11 digit format
  });

  it('should find max fingerprint value before breaking apart', () => {
    let anagram = new Anagram('dictionary.txt');
    let inputWord = 'fbc';
    let dictionaryWord = 'dea';
    expect(anagram.fingerprint(inputWord)).toEqual(195); // 11 digit format
    expect(anagram.fingerprint(dictionaryWord)).toEqual(154); // 11 digit format
  });

  it('should sort word', () => {
    let anagram = new Anagram('dictionary.txt');
    expect(anagram.sortWord('cba')).toEqual('abc');
  });

});