import { Anagram } from '../../backend/source/anagram.js';

describe("should find anagram", () => {

  let anagram: Anagram;

  beforeAll(async () => {
    anagram = new Anagram('dictionary.test.txt');
    await anagram.setup();
  });

  it('should throw error if file does not exist', () => {
    expect(() => {
      new Anagram('/path/to/file/that/does/not/exist.txt');
    }).toThrowError('File not found!');
  });

  it('should load dictionary into array', () => {
    const dictionary = anagram.loadDictionaryIntoArray();
    expect(dictionary).toContain('iceman'); 
  });

  // test the final result is less brittle

  it('gets cinema for iceman', async () => {
    expect(await anagram.findAnagrams('iceman')).toContain('cinema');
  });

  it('gets iceman for cinema', async () => {
    expect(await anagram.findAnagrams('cinema')).toContain('iceman');
  });

  it('validate word', async () => {
    expect(anagram.validateAlpha('[object promise]')).toEqual(false);
  });
});