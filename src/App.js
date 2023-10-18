import typewriter from './typewriter.png';
import './App.css';
import anagram from './Anagram.js';

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
        <a href='https://react.dev/' className="">Built on ReactJS</a>
      </header>
    </div>
  );
}

const handleClickOnGenerateButton = async () => {

  let anagramTxt = await loadAnagramsToTxt();
  const localAnagramMap = fileTxtToHashMap(anagramTxt);

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

async function loadAnagramsToTxt() {
  let text = "";
  let sources = [];
  // easy to extend
  sources.push("http://localhost:3000/anagrams/anagramMap.sample.txt");
  sources.push("http://localhost:3000/anagrams/anagramMap.txt");
  sources.push("http://localhost:3000/");

  sources.forEach(async function (source) {
    try {
      let response = await fetch(source);
      text = await response.text();
    } catch (err) {
      console.log(`Error fetching ${source}: ${err}`);
    }
  });
  return text;
}

function fileTxtToHashMap(txt) {
  let anagramMap = new Map();
  let anagrams = txt.split('\n');
  anagrams.forEach(function (anagram) {
    try {
      vals = anagram.split(',');
      anagramMap.set(vals[0], vals.slice(1));
    } catch (err) {
      console.log(`Error parsing ${anagram}: ${err}`);
    }
    
  });
  return anagramMap;
}

function styleOutput(input) {
  return input.toString().replace(/,([a-z])/gi, ', $1'); // space after commas
}

export default App;
