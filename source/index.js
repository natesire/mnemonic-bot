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

  let anagram = new Anagram('../dictionary.test.txt');
  let anagrams = anagram.findAnagrams(word);

  // return anagrams if found
  if(anagrams) console.log(anagrams);
  if(anagrams === undefined) console.log(`No anagrams found for ${word}`);
  
  rl.close(); // close the readline interface
});