import fs from 'fs';    // use this for esmodules and typescript
import { createClient } from 'redis';

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

  async setup() {
    await this.client.connect();
    let dictionaryArr = this.loadDictionaryIntoArray();
    this.sortedDictionary = await this.sortDictionaryWordsIntoRedis(dictionaryArr);
  }

  async getAnagrams(sortedWordKey: string) : Promise<string> {
    let anagramsVal = await this.client.get(sortedWordKey);
    return anagramsVal;
  }

  async setAnagrams(wordKey: string, anagramsCommaSeperated: string) {
    //await this.client.set(wordKey, '1'); // prevents duplicates
    await this.client.set(wordKey, anagramsCommaSeperated);
    return true;
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

  filterDups(addWord: string, preWords: string) {
    let result = '';
    if(preWords.indexOf(`${addWord},`) === -1 && preWords.indexOf(`,${addWord}`) === -1) {
      if(preWords) result = ',';
      result = result + `${addWord}`;
    }
    return result;
  }

  // sorts the entire file and stores it in a hash map
  async sortDictionaryWordsIntoRedis(dictionary: string[]) { // array passed by reference
    // node js doesn't have tail call recursion so we use a loop
    for(let word of dictionary) {
      // will compare words by sorting each char in ascending order
      let sortedWordKey = this.sortWord(word);
      let preExistingWordsInValue = await this.getAnagrams(sortedWordKey);
      await this.setAnagrams(sortedWordKey, preExistingWordsInValue + this.filterDups(word,preExistingWordsInValue));
    }
  }
  
  // ascending order, a to z
  // can try quick sort or radix sort for longer words
  sortWord(word: string) {
    return word.split('').sort().join(''); 
  }
}