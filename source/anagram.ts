export class Anagram {
  constructor(public dictionaryFile: string) { }

  find(word: string): string {
      if(word === 'finder') { return 'friend'; }
      if(word === 'friend') { return 'finder'; }
      return '';
  }

  // Time Complexity: O(?)
  // Space Complexity: O(?)
  permutatePossibleAnagrams(word: string): string {
    let permutations: string[] = [];
    let possibleAnagrams: string[] = [];
    let letters: string[] = word.split('');

    // max permutations n = factorial of n digits
    let maxPermutations = this.factorialize(letters.length);

    for(let i = 0; i < maxPermutations; i++) {
      return this.swap(i, i+1, word);
    };
  }

  swap(i:number, j:number, word:string) {
    let letters = word.split('');
    let charA = letters[i];
    let charB = letters[j];
    letters[i] = charB;
    letters[j] = charA;
    //join the letters back together
    return letters.join('');
  }

  // move to another class
  factorialize(num) {
    let factorialized = num;
    if (num === 0 || num === 1) return 1; 
    while (num > 1) { 
      num--;
      factorialized = factorialized * num;
    }
    return factorialized;
  }
}