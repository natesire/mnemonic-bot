#!/usr/bin/node

import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//read user input
rl.question('enter word to find anagrams:', function (word) {
  console.log(`anagrams of ${word}:`);
  rl.close();
});
