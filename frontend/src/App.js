import logo from './logo.svg';
import './App.css';
//import { Anagram } from './anagram.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter a word to create Anagrams
        </p>
        <input id='search'></input>
        <input type='submit' value='Generate' onClick={search}></input>
      </header>
    </div>
  );
}

function search() {
  var word = document.getElementById('search').value;
  alert('search')
  //let anagram = new Anagram(word);
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
