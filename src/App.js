import typewriter from './typewriter.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
        <img src={typewriter} className="typewriter" alt="logo" />
        </div>
        <p>Search for Anagrams</p>
        <input
          id="search"
          className="searchField"
          placeholder="enter word or letters"
        ></input>
        <input
          type="submit"
          className="myButton"
          value="Search"
          onClick={handleClickOnGenerateButton}
        ></input>
        <p id="searchFor" className="searchFor"></p>
        <p id="anagramsResults" className="anagramResults"></p>
      </header>
    </div>
  );
}

const handleClickOnGenerateButton = async () => {

  await searchAnagrams()

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
  //const controller = new AbortController();
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

async function searchAnagrams() {

  // cache the anagram map on the client
  let file = await fetch("http://localhost:3000/anagrams/anagramMap.txt");
  console.log(await file.text());
  let out = Object.getOwnPropertyNames(file)
  console.log(out);

  //var wordToSearchFor = document.getElementById('search').value;

}

function styleOutput(input) {
  return input.toString().replace(/,([a-z])/gi, ', $1'); // space after commas
}

export default App;
