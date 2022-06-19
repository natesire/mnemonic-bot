
export class CountSort {

  // average linear time
  public sortWordByCount(word: string) {

    
    
    return this.bucketsToWord(this.populateBuckets(word));
  }

  // create hashmap with a to z as keys
  private aToZHashMap() {
    let hashMap = new Map();
    for(let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
      hashMap.set(String.fromCharCode(i), 0);
    }
    return hashMap;
  }

  // count sort, populate hashmap with a to z counts
  populateBuckets(word: string) {
    let hashMap = this.aToZHashMap();
    for(let i = 0; i < word.length; i++) {
      let char = word.charAt(i);
      let count = hashMap.get(char);
      count = Number(count) + 1;
      hashMap.set(char, Number(count));
    }
    return hashMap;
  }

  // turn buckets into sorted word
  bucketsToWord(bucketsMap: Map<string, number>) {
    let sortedWord = '';
    bucketsMap.forEach((nVal, letterKey) => {
      sortedWord += this.repeatLetters(letterKey, nVal)
    });
    return sortedWord;
  }

  repeatLetters(letter: string, n: number) {
    return letter.repeat(n);
  }

  randomString(length: number) {
    let randomChars: string = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
      randomChars += characters.charAt(Math.floor(this.zeroToOneRandom() * characters.length));
    }
    return randomChars;
  }

  zeroToOneRandom() {
    return Math.random();
  }

  isSorted(word: string) {
    let wordArr = word.split('');
    let cloneArr = wordArr.filter((char, index) => { return char.charCodeAt(0) >= wordArr[index - 1]?.charCodeAt(0); } );
    return cloneArr.length + 1 === wordArr.length;
  }
}