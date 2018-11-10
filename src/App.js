import React, { Component } from 'react';
import logo from './pokeball.svg';
import './App.css';

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

P.resource("https://pokeapi.co/api/v2/pokemon/1/").then(function(response)
{
  console.log(response.forms[0].name);
  console.log(response.sprites.front_default);
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p id = "test">
            This is going to turn into a pokedex!
          </p>
        </header>
      </div>
    );
  }
}

export default App;
