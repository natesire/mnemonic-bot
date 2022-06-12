#!/usr/bin/node

import { Anagram } from '../dist/source/anagram.js';
import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var waitForUserInput = function() {
  rl.question("enter word to find anagrams: ", function(word) {
    let anagram = new Anagram('../dictionary.txt');
    let anagrams = anagram.findAnagrams(word);

    // return anagrams if found
    if(anagrams) console.log(anagrams);
    if(anagrams === undefined) console.log(`No anagrams found for ${word}`);
    
    if (word == "exit"){
        rl.close();
    } else {
        waitForUserInput();
    }
  });
}

waitForUserInput();