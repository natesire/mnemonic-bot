export class Anagram {
  constructor(public dictionaryFile: string) { }

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
        console.log(char);
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