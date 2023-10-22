import { Anagram } from './Anagram';
import fetch from 'node-fetch';

describe("should find anagram", () => {
let anagram = new Anagram('./dictionary.test.txt');

  beforeAll(async () => {
    
    anagram = new Anagram('./dictionary.test.txt');
    await anagram.setup();
  });

  it('should throw error if file does not exist', () => {
    expect(() => {
      new Anagram('/path/to/file/that/does/not/exist.txt');
    }).toThrowError('File not found!');
  });
});