import logo from './logo.svg';
import './App.css';
//import { Anagram } from './anagram.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">

<div className="container">
  <img className="typewriter" src="typewriter2.png" alt="typewriter"></img>
</div>

        <p>
          Search for Anagrams
        </p>
        <input id='search' className="searchField" placeholder='enter word or letters'></input>
        <input type='submit' className="myButton" value='Search' onClick={handleClickOnGenerateButton}></input>
        <p id="searchFor" className="searchFor"></p>
        <p id='anagramsResults' className='anagramResults'></p>
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

  // fetch with a timeout of 10 seconds
  const controller = new AbortController();
  //const timeout = setTimeout(() => { controller.abort(); }, 10000);
  //const responseFromBackend = await fetch("http://localhost:3000/?word=" + searchFor, { signal: controller.signal });


  //fuzzy match one letter
  sortedWordKey += "u"
  sortedWordKey = sortedWordKey.split('').sort().join('').toLowerCase();

  let output = localAnagramMap.get(sortedWordKey) || 'no anagrams found';

  // the view is responsible for formatting the output
  output = styleOutput(output);

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

function styleOutput(input) {
  return input.toString().replace(/,([a-z])/gi, ', $1'); // space after commas
}

export default App;
