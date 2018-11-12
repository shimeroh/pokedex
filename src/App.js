import React, { Component } from 'react';
import logo from './pokeball.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

class App extends Component {
  render() {
    return (
      <div className="App">
          <br />
          <img id ="HeaderImage" src={logo} alt="logo" />
          <p id = "test">
            Welcome to Pokézu!
          </p>
          <PokedexDisplay url="https://pokeapi.co/api/v2/pokemon/"/>
      </div>
    );
  }
}

class PokedexDisplay extends Component {
  componentDidMount() {
    const self = this;

    P.resource(this.props.url).then(function(response)
    {
      console.log(response);
      self.setState({ response: response });
    });
  }

  render() {
    return (
      <div id="display">
        {this.state && <Grid container spacing={16} justify={'space-evenly'} alignItems={'center'}>{this.state.response.results.map(pokemon => <PokedexThumbnail url={pokemon.url}/>)}</Grid>}
      </div>
    );
  }
}

class PokedexThumbnail extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    const self = this;

    P.resource(this.props.url).then(function(response)
    {
      self.setState({ response: response });
    });
  }

  handleClick(e) {
    this.setState({ pokemonInfo: <PokedexEntry info={this.state.response}/>});
  }

  render() {
    return (
      <Grid item>
        <button onClick={(e) => this.handleClick()}>
          {this.state && <img id="sprite" className="App-logo" src={this.state.response.sprites.front_default || logo} alt="sprite" />}
          <br />
          {this.state && this.state.response.name}
        </button>
        {this.state && this.state.pokemonInfo}
      </Grid>
    )
  }
}

class PokedexEntry extends Component{
  render() {
    console.log(this.props.info.types[0].type.name);

    return (
      <div id="overlay">
        <div id="card">
          <div id="cardheader">
            <img id="entrysprite" src={this.props.info.sprites.front_default} alt="sprite" />
            <h2 id="pokemonname">{this.props.info.name}</h2>
          </div>
          <hr />
          <h3>base stats</h3>
          hp: {this.props.info.stats[5].base_stat} <br/>
          attack: {this.props.info.stats[4].base_stat} <br/>
          defence: {this.props.info.stats[3].base_stat} <br/>
          special attack: {this.props.info.stats[2].base_stat} <br/>
          special defense: {this.props.info.stats[1].base_stat} <br/>
          speed: {this.props.info.stats[0].base_stat} <br/>
        </div>
      </div>
    )
  }
}

export default App;
