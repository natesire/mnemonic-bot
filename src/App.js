import logo from './logo.svg';
import './App.css';
//import { Anagram } from './anagram.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter word to generate anagrams
        </p>
        <input id='search' placeholder='enter word'></input>
        <input type='submit' value='Generate' onClick={handleClick}></input>
        <p id='anagrams'></p>
      </header>
    </div>
  );
}

const handleClick = async () => {

    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    console.log(data);

    const res2 = await fetch("http://localhost:3000/");
    const data2 = await res2.json();
    console.log(data2);

  fetch('https://jsonplaceholder.typicode.com/todos/1').then(function (response) {
  let j = response.json();
  //console.log(j);
  })
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
