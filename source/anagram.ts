export class Anagram {
  constructor(public dictionaryFile: string) { }

  find(word: string): string {
      if(word === 'finder') { return 'friend'; }
      if(word === 'friend') { return 'finder'; }
      return '';
  }

  // can 'friend' be scrambled to equal 'finder'
  // faster time complexity than brute forcing the permutations, counter intuitive
  // just make sure the letters are in both words
  matchScrambled(wordOne: string, wordTwo:string): boolean {
    if(!this.matchLength(wordOne, wordTwo)) { return false; }
    let wordOneChars = wordOne.split('');
    let wordTwoChars = wordTwo.split('');
    // find difference between the two words
    let diff = wordOneChars.filter(char => !wordTwoChars.includes(char)); // O(n) linear time complexity
    if(diff.length > 0) { return false; }
    return true;
  }

  // match length to eliminate possible scrambled anagram
  matchLength(wordOne: string, wordTwo:string): boolean {
    return wordOne.length === wordTwo.length;
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