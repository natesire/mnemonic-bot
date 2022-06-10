#!/usr/bin/node

import { Anagram } from '../dist/source/anagram.js';
import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
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
