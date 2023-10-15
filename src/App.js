import logo from './logo.svg';
import './App.css';
//import { Anagram } from './anagram.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Search for Anagrams
        </p>
        <input id='search' className="searchField" placeholder='enter word or letters'></input>
        <input type='submit' className="myButton" value='Search' onClick={handleClickOnGenerateButton}></input>
        <p id="searchFor" className="searchFor">search for:</p>
        <p id='anagramsResults'></p>
      </header>
    </div>
  );
}

const handleClickOnGenerateButton = async () => {

  // in case the backend is unresponsive, use this local map
  let localAnagramMap = new Map();
  localAnagramMap.set('dstuy', ['dusty', 'study']);
  localAnagramMap.set('eilv', ['live', 'evil']);

  let searchFor = document.getElementById('search').value;
  let sortedWordKey = searchFor.split('').sort().join('').toLowerCase();
  document.getElementById('searchFor').innerHTML = "searching..."

  //const responseFromBackend = await fetch("http://localhost:3000/?word=" + searchFor);
  //const anagramsJSON = await responseFromBackend.json();
  //output = anagramsJSON.anagramsResults;

  const output = localAnagramMap.get(sortedWordKey) || 'no anagrams found';
  
  document.getElementById('anagramsResults').innerHTML = output;
  document.getElementById('searchFor').innerHTML = "search for: " + searchFor;
}

function search() {
  //var wordToSearchFor = document.getElementById('search').value;

  // get request to port 3000
  // disable CORS
  fetch('https://jsonplaceholder.typicode.com/todos/1', {
     //mode: 'no-cors',
     //method: 'GET',
     /*headers: {
       'Content-Type': 'application/json'
     },*/ 
    })
  .then(function (response) {
    let j = response.json();
    document.getElementById('anagrams').innerHTML = j;
    console.log(response);
    console.log(response.data) 
  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
}

export default App;
