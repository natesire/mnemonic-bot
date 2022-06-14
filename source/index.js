#!/usr/bin/node

//import { Anagram } from '../dist/source/anagram.js';
//import readline from 'readline';

const Anagram = require('../dist/source/anagram.js');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var waitForUserInput = function(anagram, anagrams) {
  rl.question("AnagramFinder> ", function(word, anagramInst) {
    let timeThree = time();

    if(word == 'exit') {
      rl.close();
      process.exit([0]);
      return;
    }

    anagram.findAnagrams(word).then(function(anagrams) {
      let timeFour = time();
      let timeDiff = timeFour - timeThree;

      // count the number of anagrams
      let anagramCount = anagrams?.split(',').length;

      // return anagrams if found
      if(anagrams) { console.log(`${anagramCount} Anagrams found for ${word} in ${timeDiff} ms`); }
      if(anagrams) console.log(anagrams);
      if(anagrams === undefined) console.log(`No anagrams found for ${word} in ${timeDiff} ms`);

      waitForUserInput(anagram, ''); // does not add to the call stack
    });
  });
}

function setup() {
  let timeOne = time();
  let anagramInst = new Anagram('../dictionary.txt');
  anagramInst.setup();
  let timeTwo = time();
  console.log(`Dictionary loaded in ${timeTwo - timeOne} ms`);
  return anagramInst;
}

let anagramInstance = setup();
waitForUserInput(anagramInstance, '');

// time profile the code
function time() {
  return new Date().getTime();
}