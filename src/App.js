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
        <input id='search' className="enter" placeholder='enter word or letters'></input>
        <input type='submit' className="myButton" value='Search' onClick={handleClickOnGenerateButton}></input>
        <p id="searchFor">search for:</p>
        <p id='anagramsResults'></p>
      </header>
    </div>
  );
}

const handleClickOnGenerateButton = async () => {
  let searchFor = document.getElementById('search').value;
  document.getElementById('searchFor').innerHTML = "searching..."
  const responseFromBackend = await fetch("http://localhost:3000/?word=" + searchFor);
  const anagramsJSON = await responseFromBackend.json();
  document.getElementById('anagramsResults').innerHTML = anagramsJSON.anagramsResults;
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
