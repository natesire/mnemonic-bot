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
  console.log(findAnagrams);
  document.getElementById('anagrams').innerHTML = findAnagrams;
  /*
  fetch('http://localhost:5000/anagrams/' + word)
    .then(response => response.json())
    .then(data => {
      var anagrams = data.anagrams;
      var anagramString = '';
      for (var i = 0; i < anagrams.length; i++) {
        anagramString += anagrams[i] + ', ';
      }
      alert(anagramString);
    });
    */
}

export default App;
