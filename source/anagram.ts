import fs from 'fs';

// find all anagrams in dictionary
export class Anagram {
  public dictionary: string[] = []; 
  
  constructor(public dictionaryFile: string) {
    this.dictionaryFile = dictionaryFile;
  }

  loadDictionaryIntoArray(): string[] {
    var dictionary: string[] = [];
    try {
      var dictionary: string[] = fs.readFileSync(this.dictionaryFile, 'utf8').split('\n');
    } catch (error) {
      console.log(error);
    }
    return dictionary;
  }

  // array passed by reference
  iterateDictionary(dictionary: string[]) : string[] {
    dictionary.map(word => { this.sortWord(word); });
    return dictionary;
  }

  sortWord(word: string) {
    return word.split('').sort().join(''); 
  }
}