import { Anagram } from '../source/anagram.js';

describe("should find anagram", () => {

  let anagram: Anagram;

  beforeAll(async () => {
    anagram = new Anagram('dictionary.test.txt');
    await anagram.setup();
  });

  afterAll(async () => {
    await anagram.close();
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

  it('set and get cinema', async () => {
    await anagram.setAnagrams('test', 'test');
    expect(await anagram.getAnagrams('test')).toContain('test');
  });

  it('dup word', async () => {
    expect(anagram.filterDups('stop', 'stop,pots')).toEqual('');
  });

  it('dup word', async () => {
    expect(anagram.filterDups('pots', 'stop,pots')).toEqual('');
  });

  it('non dup word', async () => {
    expect(anagram.filterDups('pota', 'stop,pots')).toEqual(',pota');
  });

  
});