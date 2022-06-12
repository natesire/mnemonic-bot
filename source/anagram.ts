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

    let timeOne = this.time();
    this.dictionaryArr = this.loadDictionaryIntoArray();
    let timeTwo = this.time();
    console.log(`time taken to load dictionary: ${timeTwo - timeOne} milliseconds`);
  }

  findAnagrams(word: string) {
    let timeOne = this.time();
    let sortedWord = this.sortWord(word);
    let sortedDictionary = this.sortDictionaryWords(this.dictionaryArr);
    let anagrams = sortedDictionary.get(sortedWord);
    let timeTwo = this.time();
    console.log(`time taken for anagram: ${timeTwo - timeOne} milliseconds`);
    return anagrams;
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
      // lower case prevents accidental duplicates
      let sortedWordKeyLowerCase = sortedWordKey.toLowerCase();
      let commaSeperatedWordsLowerCase = commaSeperatedWords.toLowerCase();
      this.sortedDictionary.set(sortedWordKeyLowerCase, commaSeperatedWordsLowerCase);

      delimeter = ',';
      i++;
    });
    return this.sortedDictionary;
  }

  // quicksort on a one word string
  // sortWordQuick(word: string) { 

  // ascending order, a to z
  sortWord(word: string) {
    return word.split('').sort().join(''); 
  }

  time() {
    return new Date().getTime();
  }
}