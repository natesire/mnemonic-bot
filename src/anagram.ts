
import * as fs from 'fs';    // use this for esmodules and typescript

export class Anagram {
  public dictionary: string[] = []; 
  public sortedDictionary;
  public dictionaryArr: string[];
  public client: any;
  public anagramMap: Map<string, string>;
  // easier to read tweak vars up front
  public anagramSources = ["http://localhost:3000/", "http://localhost:3000/anagrams/anagram.txt", "http://localhost:3000/anagrams/anagram.sample.txt"];
  
  constructor(public dictionaryFile: string) {
    this.dictionaryFile = dictionaryFile; // loads dictionary file
    /*if (!fs.existsSync(this.dictionaryFile)) {
      throw new Error('File not found!');
    }*/

    this.anagramMap = new Map<string, string>();
    this.anagramSources.forEach((source) => this.loadAnagrams(source));
  }

  async loadAnagrams(source) {
    let responseTextMultiLine = await this.fetch(source);
    let lines = responseTextMultiLine?.split('\r\n');
    lines?.forEach((line) => {
      let anagramEntry = line.split(',');
      this.anagramMap.set(anagramEntry[0], anagramEntry.slice(1).join(','));
    });
  }

  async fetch(source: string) : Promise<string | undefined> {
    let responseTextMultiLine : string;
    try {
      let response = await fetch(source); // timeout?, json?
      responseTextMultiLine = await response.text();
      return responseTextMultiLine;
    } catch (err) {
      console.log(`Error fetching ${source}: ${err}`);
    }
  }

  async setup() {
    //await this.client.connect();
    let dictionaryArr = this.loadDictionaryIntoArray();
    this.sortedDictionary = await this.sortDictionaryWordsIntoRedis(dictionaryArr);
  }

  // how to preload the dictionary?
  /*
  async readAnagramsFromRedis(sortedWordKey: string) : Promise<string> {
    let commaSeparatedAnagrams = await this.client.get(sortedWordKey);
    let anagramsArr = commaSeparatedAnagrams.split(',').filter((item) => item.match(/^[a-z]+/)); // filter out empty strings
    let anagramsWithCommas = anagramsArr.join(',');
    return anagramsWithCommas;
  }*/

  async setAnagrams(wordKey: string, anagramsCommaSeperated: string) {
    let anagrams = anagramsCommaSeperated.split(',');
    let cleaned = anagrams.filter((item) => item.match(/^[a-z]+/));
    //let uniqueAnagrams = [...new Set(cleaned)];
    //let anagramsUniqueCommaSeperated = uniqueAnagrams.join(',');

    //await this.client.set(wordKey, anagramsUniqueCommaSeperated);
  }

  search(word: string) : string {
    let sortedWordKey = this.sortStr(word);
    let anagrams = this.anagramMap.get(sortedWordKey);
    return anagrams || 'Anagrams not found';
    /*return new Promise((resolve, reject) => {
      resolve(anagrams || 'Anagrams not found');
    });*/
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
      let sortedWordKey = this.sortStr(word);
      //let preExistingWordsInValue = await this.readAnagramsFromRedis(sortedWordKey);
      //await this.setAnagrams(sortedWordKey, preExistingWordsInValue + this.comma(word));
    }
  }

  preCommaWord(word: string) {
    if(word) return `,${word}`;
  }
  
  // NodeJS is probably using merge sort
  sortStr(word: string) : string {
    return word.split('').sort().join(''); 
  }
}