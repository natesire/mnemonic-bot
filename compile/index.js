#!/usr/bin/node

//import { Anagram } from '../dist/source/anagram.js';
//import readline from 'readline';

//const Anagram = require('../dist/source/anagram.js');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.prompt();

rl.on('line', (line) => {
    if (line.toLowerCase() === "exit") {
        console.log('\nExiting!\n');
        process.exit(0);        
    } else if (line.trim() === "") {
        console.log(`\n${Date.now().toString(36)}\n`)
    } else {
        console.log(`\n${new Date(parseInt(line, 36)).toString()}\n`)
    }
    rl.prompt();

    console.log(`anagrams of ${line}:`);

    // match this
    let sortedWord = line.split('').sort().join('');

    let anagram = new Anagram('../dictionary3.txt');
    const dictionary = anagram.loadDictionaryIntoArray();
    let sortedDictionary = anagram.iterateDictionaryAndSort(dictionary);
    let anagrams = sortedDictionary.get(sortedWord)
    console.log(anagrams);
    rl.close();

}).on('close', () => {
    console.log('Exiting!');
    process.exit(0);
});

//read user input
  rl.question('enter word to find anagrams:', function (word) {
    console.log(`anagrams of ${word}:`);

    // match this
    let sortedWord = word.split('').sort().join('');

    let anagram = new Anagram('../dictionary3.txt');
    const dictionary = anagram.loadDictionaryIntoArray();
    let sortedDictionary = anagram.iterateDictionaryAndSort(dictionary);
    let anagrams = sortedDictionary.get(sortedWord)
    console.log(anagrams);
    rl.close();
  });

class Anagram {
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