import fs from 'fs';
//const fs = require('fs');
// find all anagrams in dictionary
export class Anagram {
    constructor(dictionaryFile) {
        this.dictionaryFile = dictionaryFile;
        this.dictionary = [];
        this.dictionaryFile = dictionaryFile;
        this.sortedDictionary = new Map(); // hash map
        // validations here to keep the code clean
        if (!fs.existsSync(this.dictionaryFile)) {
            throw new Error('File not found!');
        }
    }
    loadDictionaryIntoArray() {
        var dictionary = fs.readFileSync(this.dictionaryFile, 'utf8').split('\r\n');
        return dictionary;
    }
    // array passed by reference
    iterateDictionaryAndSort(dictionary) {
        let delimeter = '';
        let i = 0;
        dictionary.forEach(word => {
            let preVal = ' ' + this.sortedDictionary.get(this.sortWord(word)); // check if pre-existing key
            if (preVal === ' ' + undefined) {
                preVal = '';
            }
            let sortedWord = this.sortWord(word);
            let newVal = preVal + delimeter + word;
            //strip off the first comma
            if (newVal.charAt(0) === ',') {
                newVal = newVal.substring(1);
            }
            if (newVal.charAt(0) === ' ') {
                newVal = newVal.substring(1);
            }
            this.sortedDictionary.set(sortedWord, newVal);
            delimeter = ',';
            //console.log(i)
            //console.log(`preVal: ${preVal}`);
            i++;
        });
        return this.sortedDictionary;
    }
    sortWord(word) {
        return word.split('').sort().join('');
    }
}
//# sourceMappingURL=anagram.js.map