import React from 'react';
import logo from './logo.svg';
import typewriter from './typewriter.png'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
        <img src={typewriter} className="typewriter" alt="logo" />
        </div>
        <p>Enter Message to Diddo</p>
        <input
          type="text"
          id="search"
          placeholder="enter word or letters"
        ></input>
        <input
          type="submit"
          className="myButton"
          value="Submit"
          onClick={handleClickOnGenerateButton}
        ></input>
        <textarea id="chat"></textarea>
        <p id="searchFor" className="searchFor"></p>
        <p id="anagramsResults" className="anagramResults"></p>
      </header>
    </div>
  );
}

function handleClickOnGenerateButton() {

}

export default App;
