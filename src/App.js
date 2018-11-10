import React, { Component } from 'react';
import logo from './pokeball.svg';
import './App.css';

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

var pokemonName;
var pokemonSprite;

/*P.resource("https://pokeapi.co/api/v2/pokemon/1/").then(function(response)
{
  pokemonName = response.forms[0].name;
  console.log(pokemonName);
  pokemonSprite = response.sprites.front_default;
  console.log(pokemonSprite);
  document.getElementById("test").innerHTML = pokemonName;
  document.getElementById("sprite").src = pokemonSprite;
});*/

class App extends Component {
  render() {
    return (
      <div className="App">
          <img id ="sprite" src={logo} className="App-logo" alt="logo" />
          <p id = "test">
            This is going to turn into a pokedex!
          </p>
          <Entry name="bulbasaur">
          </Entry>
      </div>
    );
  }
}

class Entry extends Component {
  
  componentDidMount() {
    const self = this;

    P.resource("https://pokeapi.co/api/v2/pokemon/1/").then(function(response)
    {
      pokemonName = response.forms[0].name;
      self.setState({ response: response });
      console.log(pokemonName);
      pokemonSprite = response.sprites.front_default;
      console.log(pokemonSprite);
      document.getElementById("test").innerHTML = pokemonName;
      document.getElementById("sprite").src = pokemonSprite;
    });
  }

  render() {
    return (
      /*<div className="Entry">
        <img id="sprite" src={this.props.imagesrc} className="App-logo" alt="logo" />
        <p id="name">
          {this.props.name}
        </p>
      </div>*/
      <div>
        {this.state && this.state.response.forms[0].name}
      </div>
    )
  }
}

export default App;
