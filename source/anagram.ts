import fs from 'fs';    // use this for esmodules and typescript
//const fs = require('fs'); // needed for exe compiling

// find all anagrams in a dictionary
export class Anagram {
  public dictionary: string[] = []; 
  public sortedDictionary: Map<string, string>;
  public dictionaryArr: string[];
  
  constructor(public dictionaryFile: string) {
    this.dictionaryFile = dictionaryFile; // loads dictionary file
    this.sortedDictionary = new Map();    // hash map to store sorted words
    // validations here to keep the code clean
    if (!fs.existsSync(this.dictionaryFile)) {
      throw new Error('File not found!');
    }
    let dictionaryArr = this.loadDictionaryIntoArray();
    this.sortedDictionary = this.sortDictionaryWordsIntoHashMap(dictionaryArr);
  }

  findAnagrams(word: string) {
    let sortedWord = this.sortWord(word);
    let anagrams = this.sortedDictionary.get(sortedWord);
    return anagrams;
  }

  loadDictionaryIntoArray(): string[] {
    var dictionary: string[] = fs.readFileSync(this.dictionaryFile, 'utf8').split('\r\n');
    return dictionary;
  }

  // sorts the entire file and stores it in a hash map
  sortDictionaryWordsIntoHashMap(dictionary: string[]) : Map<string, string> { // array passed by reference
    // set once for the loop to prevent leading commas
    let delimeter: string = '';

    dictionary.forEach(word => {
      let commaSeperatedWords = '';

      // will compare words by sorting each char in ascending order
      let sortedWordKey = this.sortWord(word);

      // check if pre-existing key to prevent duplciates
      let preExistingWord = this.sortedDictionary.get(sortedWordKey); 

      if(preExistingWord) { commaSeperatedWords = preExistingWord + delimeter; }
      commaSeperatedWords = commaSeperatedWords + word; 

      // add anagram to hash map
      // lower case prevents accidental duplicates and matches command line input
      if(sortedWordKey && commaSeperatedWords) {
        let sortedWordKeyLowerCase = sortedWordKey.toLowerCase();
        let commaSeperatedWordsLowerCase = commaSeperatedWords.toLowerCase();
        this.sortedDictionary.set(sortedWordKeyLowerCase, commaSeperatedWordsLowerCase);
      }
      delimeter = ',';
    });
    return this.sortedDictionary;
  }
  
  // ascending order, a to z
  // can try quick sort or radix sort for longer words
  sortWord(word: string) {
    return word.split('').sort().join(''); 
  }
}