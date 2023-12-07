import React from 'react';
import logo from './logo.svg';
import typewriter from './typewriter.png'
import './App.css';

//import Frontend from 'natejs/src/index';

function handleSubmit() {
  const command = document.getElementById('command') as HTMLInputElement;
  const chat = document.getElementById('chat') as HTMLTextAreaElement;
  chat.value += 'Me: ' + command.value + '\n';

  //let frontend = new Frontend();
  //frontend.fetch("http://localhost:3000");

  // send to the server
  
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
        <img src={typewriter} className="typewriter" alt="logo" />
        </div>

        <select id="command" className="command">
          <option value="en">search</option>
          <option value="fr">anagram</option>
          <option value="de">number word</option>
          <option value="it">chatGPT</option>
          <option value="es">Spanish</option>
        </select>

        <textarea id="chat"></textarea>
<input
          type="text"
          id="command"
          placeholder="anagrams for word"
        ></input>
        <input
          type="submit"
          className="myButton"
          value=">>"
          onClick={handleSubmit}
        ></input>

        <p id="searchFor" className="searchFor"></p>
        <p id="anagramsResults" className="anagramResults"></p>
      </header>
    </div>
  );
}

function search() {
  const chat = document.getElementById('chat') as HTMLTextAreaElement;
  chat.value += 'Me: ' + 'search' + '\n';
}



export default App;
