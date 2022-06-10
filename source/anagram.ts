import fs from 'fs';
export class Anagram {
  public dictionary: string[] = []; // 263,000 words in dictionary
  //public dictionaryFile: string;

  constructor(public dictionaryFile: string) {
    this.dictionaryFile = dictionaryFile;
    this.dictionary = this.loadDictionary();
  }

  loadDictionary(): string[] {
    let time1 = new Date().getTime();

    try {
      const content = fs.readFileSync(this.dictionaryFile, 'utf-8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('File not found!');
        throw 'File not found!';
      } else {
        throw error;
      }
    }

    //read file into array
    try {
      var dictionary: string[] = fs.readFileSync(this.dictionaryFile, 'utf8').split('\n');
    } catch (error) {
      console.log(error);
    }
    
    let time2 = new Date().getTime();
    console.log(`${time2 - time1} ms to load dictionary`);
    return dictionary;
  }

  shardDictionaryByLength(dictionary: string[]) {

  }

  // can input word 'friend' be scrambled to equal dictionary word 'finder'
  // faster time complexity than brute forcing the permutations, counter intuitive
  // O(n) instead of O(n^2)
  // just make sure the letters are in both words
  matchScrambled(wordOne: string, wordTwo:string): number {
    let diffN: number = Math.abs(wordOne.length - wordTwo.length);
    if(diffN === 0) {
      let wordOneChars = wordOne.split('');
      let wordTwoChars = wordTwo.split('');
      // find difference between the two words
      // parent iteration of the dictionary will cause O(n^2)
      //let diff = wordOneChars.filter(char => !wordTwoChars.includes(char));
      wordOneChars.forEach(char => {
        // check if repeat
        if(!wordTwoChars.includes(char)) { diffN++; }
      });
    }
    return diffN;
  }

  // calculates max possible anagrams of a word 
  factorialize(n:number) : number {
    let factorialized = n;
    if (n === 0 || n === 1) return 1; // factorial of 0 equals 1
    while (n > 1) { //  while is more efficient than for loop
      n--;
      factorialized = factorialized * n;
    }
    return factorialized;
  }
}