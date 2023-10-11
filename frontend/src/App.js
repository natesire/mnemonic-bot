import logo from './logo.svg';
import './App.css';
import { Anagram } from './anagram.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter word to generate anagrams
        </p>
        <input id='search' placeholder='enter word'></input>
        <input type='submit' value='Generate' onClick={search}></input>
        <p id='anagrams'></p>
      </header>
    </div>
  );
}

function search() {
  var word = document.getElementById('search').value;
  let anagram = new Anagram(word);
  let findAnagrams = anagram.findAnagrams(word);
  findAnagrams.then(function (result) {
    document.getElementById('anagrams').innerHTML = result;
  });
}

export default App;
