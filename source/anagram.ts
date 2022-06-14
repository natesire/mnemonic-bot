import fs from 'fs';    // use this for esmodules and typescript

// find all anagrams in a dictionary
export class Anagram {
  public dictionary: string[] = []; 
  public sortedDictionary; //: Map<string, string>;
  public dictionaryArr: string[];
  public client: any;
  
  constructor(public dictionaryFile: string) {
    this.dictionaryFile = dictionaryFile; // loads dictionary file
    //this.sortedDictionary = new Map();    // hash map to store sorted words
    // validations here to keep the code clean
    if (!fs.existsSync(this.dictionaryFile)) {
      throw new Error('File not found!');
    }
  }

  async setup() {
    this.sortedDictionary = new Map();
    let dictionaryArr = this.loadDictionaryIntoArray();
    this.sortedDictionary = await this.sortDictionaryWordsIntoHashMap(dictionaryArr);
  }

  async getAnagrams(word: string) : Promise<string> {
    return this.sortedDictionary?.get(word);
  }

  async setAnagrams(wordKey: string, anagramsCommaSeperated: string) {
    // validate letters only
    if(wordKey.match(/^[a-z]+$/i) && anagramsCommaSeperated.match(/^[a-z]+\,?$/i)) {
      this.sortedDictionary.set(wordKey, anagramsCommaSeperated);
      return true;
    }
    throw new Error(`Invalid: key ${wordKey} value: ${anagramsCommaSeperated}`);
  }

  async findAnagrams(word: string) : Promise<string> {
    let sortedWord = this.sortWord(word);
    let anagrams = await this.getAnagrams(sortedWord);
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

    // node js doesn't have tail call recursion so we use a loop
    dictionary.forEach(word => {
      let commaSeperatedWords = '';

      // will compare words by sorting each char in ascending order
      let sortedWordKey = this.sortWord(word);

      // check if pre-existing key to prevent duplciates
      let preExistingWord = this.sortedDictionary?.get(sortedWordKey); 

      if(preExistingWord) { commaSeperatedWords = preExistingWord + delimeter; }
      commaSeperatedWords = commaSeperatedWords + word; 

      // add anagram to hash map
      // lower case prevents accidental duplicates and matches command line input
      if(sortedWordKey && commaSeperatedWords) {
        let sortedWordKeyLowerCase = sortedWordKey.toLowerCase();
        let commaSeperatedWordsLowerCase = commaSeperatedWords.toLowerCase();
        this.sortedDictionary?.set(sortedWordKeyLowerCase, commaSeperatedWordsLowerCase);
      }
      delimeter = ',';
    });
    return this.sortedDictionary;
  }

  // sorts the entire file and stores it in a hash map
  async sortDictionaryWordsIntoRedis(dictionary: string[]) { // array passed by reference
    // set once for the loop to prevent leading commas
    let delimeter: string = '';

    // node js doesn't have tail call recursion so we use a loop
    //dictionary.forEach(word => {
    for(let word of dictionary) {
      let commaSeperatedWords = '';

      // will compare words by sorting each char in ascending order
      let sortedWordKey = this.sortWord(word);

      // check if pre-existing key to prevent duplicates
      let preExistingWord = await this.getAnagrams(sortedWordKey);

      if(preExistingWord) { commaSeperatedWords = preExistingWord + delimeter; }
      commaSeperatedWords = commaSeperatedWords + word; 

      // add anagram to hash map
      // lower case prevents accidental duplicates and matches command line input
      if(sortedWordKey && commaSeperatedWords) {
        let sortedWordKeyLowerCase = sortedWordKey.toLowerCase();
        let commaSeperatedWordsLowerCase = commaSeperatedWords.toLowerCase();
        //this.sortedDictionary.set(sortedWordKeyLowerCase, commaSeperatedWordsLowerCase);
        await this.sortedDictionary?.set(sortedWordKeyLowerCase, commaSeperatedWordsLowerCase);
      }
      delimeter = ',';
    }
    //return this.sortedDictionary;
  }
  
  // ascending order, a to z
  // can try quick sort or radix sort for longer words
  sortWord(word: string) {
    return word.split('').sort().join(''); 
  }
}