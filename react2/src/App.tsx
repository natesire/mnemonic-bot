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
        <p>Search for Anagrams</p>
        <input
          id="search"
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

function handleClickOnGenerateButton() {

}

export default App;
