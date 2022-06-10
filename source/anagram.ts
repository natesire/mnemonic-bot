import fs from 'fs';

// anagram lookup in constant time using hash map
// pre-processing of dictionary in linear time by using prime numbers
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

  sortWord(word: string) {
    // merge sort, O(n^2) to O(n log n)
    // time complexity would be a problem but max word length is n
    return word.split('').sort().join(''); 
  }

  // use multiplcation to get rid of linear time
  // use prime numbers to get unique numbers
  // pre-process the dictionary to number fingerprints
  fingerprint(word) {
    let fingerprint = 1;
    // linear time
    word.split('').forEach(char => {
      console.log(char);
      console.log(this.alphaPrimes()[char]);
      fingerprint = fingerprint * this.alphaPrimes()[char];
    });
    return fingerprint;
  }

  alphaPrimes(){
    // get first 26 prime numbers
    return { a:2, b:3, c:5, d:7, e:11, f:13, g:17, h:19, i:23, j:29, k:31, l:37, m:41, n:43, 
      o:47, p:53, q:59, r:61, s:67, t:71, u:73, v:79, w:83, x:89, y:97, z:101 };
  }

  shardDictionaryByLength(dictionary: string[]) {

  }

  longestWord() {
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