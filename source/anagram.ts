import fs from 'fs';    // use this for esmodules and typescript
import { createClient } from 'redis';
//const fs = require('fs'); // needed for exe compiling
import worker from 'worker_threads';

// find all anagrams in a dictionary
export class Anagram {
  public dictionary: string[] = []; 
  public sortedDictionary; //: Map<string, string>;
  public dictionaryArr: string[];
  public client: any;
  
  constructor(public dictionaryFile: string) {
    this.dictionaryFile = dictionaryFile; // loads dictionary file
    // validations here to keep the code clean
    if (!fs.existsSync(this.dictionaryFile)) {
      throw new Error('File not found!');
    }

    this.client = createClient();
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  async close() {
    this.client.quit();
  }

  async setup() {
    await this.client.connect();
    let dictionaryArr = this.loadDictionaryIntoArray();
    this.sortedDictionary = await this.sortDictionaryWordsIntoRedis(dictionaryArr);
  }

  async getAnagrams(sortedWordKey: string) : Promise<string> {
    let anagramsVal = await this.client.get(sortedWordKey);

    //self correcting, remove [object promise]
    let anagramsCleaned = anagramsVal.split(',').filter((item) => item.match(/^[a-z]+/));

    let anagramsWithCommas = anagramsCleaned.join(',');

    return anagramsWithCommas;
  }

  async setAnagrams(wordKey: string, anagramsCommaSeperated: string) {
    let anagrams = anagramsCommaSeperated.split(',');
    let cleaned = anagrams.filter((item) => item.match(/^[a-z]+/));
    let uniqueAnagrams = [...new Set(cleaned)];
    let anagramsUniqueCommaSeperated = uniqueAnagrams.join(',');

    await this.client.set(wordKey, anagramsUniqueCommaSeperated);
  }

  async findAnagrams(wordKey: string) : Promise<string> {
    let sortedWordKey = this.sortWord(wordKey);
    let anagrams = await this.getAnagrams(sortedWordKey);
    return anagrams;
  }

  loadDictionaryIntoArray(): string[] {
    var dictionary: string[] = fs.readFileSync(this.dictionaryFile, 'utf8').split('\r\n');
    return dictionary;
  }

  validateAlpha(word: string) {
    if(word.match(/^[a-z]+$/)) {
      return true;
    }
    return false;
  }

  validateValues(word: string) {
    if(word.match(/^[a-z]+,?$/)) {
      return true;
    }
    return false;
  }

  // sorts the entire file and stores it in a hash map
  async sortDictionaryWordsIntoRedis(dictionary: string[]) { // array passed by reference
    // node js doesn't have tail call recursion so we use a loop
    for(let word of dictionary) {
      // will compare words by sorting each char in ascending order
      let sortedWordKey = this.sortWord(word);
      let preExistingWordsInValue = await this.getAnagrams(sortedWordKey);
      await this.setAnagrams(sortedWordKey, preExistingWordsInValue + this.comma(word));
    }
  }

  comma(word: string) {
    if(word) return `,${word}`;
  }
  
  // ascending order, a to z
  // can try quick sort or radix sort for longer words
  sortWord(word: string) {
    return word.split('').sort().join(''); 
  }
}