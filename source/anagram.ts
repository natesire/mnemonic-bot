import fs from 'fs';

// find all anagrams in dictionary
export class Anagram {
  public dictionary: string[] = []; 
  public sortedDictionary: Map<string, string>;
  
  constructor(public dictionaryFile: string) {
    this.dictionaryFile = dictionaryFile;

    this.sortedDictionary = new Map(); // hash map

    // validations here to keep the code clean
    if (!fs.existsSync(this.dictionaryFile)) {
      throw new Error('File not found!');
    }
  }

  loadDictionaryIntoArray(): string[] {
    var dictionary: string[] = fs.readFileSync(this.dictionaryFile, 'utf8').split('\r\n');
    return dictionary;
  }

  // array passed by reference
  iterateDictionaryAndSort(dictionary: string[]) : Map<string, string> {
    dictionary.forEach(word => {
      let preVal = ' ' + this.sortedDictionary.get(this.sortWord(word)); // check if pre-existing key
      if(preVal === ' ' + undefined) { preVal = ''; }
      let sortedWord = this.sortWord(word)
      //if(!preVal.split('').includes(sortedWord)) { preVal += ' ' + sortedWord; }
      this.sortedDictionary.set(sortedWord, word + preVal);
    });
    return this.sortedDictionary;
  }

  sortWord(word: string) {
    return word.split('').sort().join(''); 
  }
}