//import fs from 'fs';    // use this for esmodules and typescript
const fs = require('fs'); // needed for exe compiling

// find all anagrams in a dictionary
export class Anagram {
  public dictionary: string[] = []; 
  public sortedDictionary: Map<string, string>;
  
  constructor(public dictionaryFile: string) {
    this.dictionaryFile = dictionaryFile; // loads dictionary file
    this.sortedDictionary = new Map();    // hash map to store sorted words

    // validations here to keep the code clean
    if (!fs.existsSync(this.dictionaryFile)) {
      throw new Error('File not found!');
    }
  }

  loadDictionaryIntoArray(): string[] {
    var dictionary: string[] = fs.readFileSync(this.dictionaryFile, 'utf8').split('\r\n');
    return dictionary;
  }

  // sorts the entire file and stores it in a hash map
  sortDictionaryWords(dictionary: string[]) : Map<string, string> { // array passed by reference
    let i = 0;
    let delimeter: string = '';
    
    dictionary.forEach(word => {
      let preExistingWord = ' ' + this.sortedDictionary.get(this.sortWord(word)); // check if pre-existing key
      if(preExistingWord === ' ' + undefined) { preExistingWord = ''; }
      let sortedWordKey = this.sortWord(word);
      
      let commaSeperatedWords = preExistingWord + delimeter + word;
      if(commaSeperatedWords.charAt(0) === ',') { commaSeperatedWords = commaSeperatedWords.substring(1); } // strip off the first comma
      if(commaSeperatedWords.charAt(0) === ' ') { commaSeperatedWords = commaSeperatedWords.substring(1); }

      // sets the hash map with anagrams
      this.sortedDictionary.set(sortedWordKey, commaSeperatedWords);

      delimeter = ',';
      i++;
    });
    return this.sortedDictionary;
  }

  // quick sort

  // ascending order, a to z
  sortWord(word: string) {
    return word.split('').sort().join(''); 
  }

  // normalize to lower case, prevent accidental duplicates
  normalizeWord(word: string) {
    return word.toLowerCase();
  }
}