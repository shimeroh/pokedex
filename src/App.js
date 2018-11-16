import React, { Component } from 'react';
import logo from './pokeball.svg';
import closeButton from './close.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-modal';

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

class App extends Component {
  render() {
    return (
      <div className="App">
          <header>
            <br />
            <img id ="HeaderImage" src={logo} alt="logo" />
            <p id="HeaderText">
              Pokézu
            </p>
          </header>
          <div className="content">
            <PokedexDisplay url="https://pokeapi.co/api/v2/pokemon/"/>
          </div>
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
    this.state = { showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  componentDidMount() {
    const self = this;

    P.resource(this.props.url).then(function(response)
    {
      self.setState({ response: response });
    });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
    //this.setState({ pokemonInfo: <PokedexEntry response={this.state.response} />});
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Grid item>
        <button class="thumb" onClick={this.handleOpenModal}>
          {this.state.response ? <img id="sprite" className="App-logo" src={this.state.response.sprites.front_default || logo} alt="sprite" />: <img id="sprite" className="loadingIcon" src={logo} alt="loading" />}
          <br />
          {this.state.response ? this.state.response.name: "loading"}
        </button>
        {this.state.response &&
          <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className="card" overlayClassName="overlay">
          <button id="closebutton" onClick={this.handleCloseModal}><img class="close" src={closeButton} alt="close"/></button>
            <div id="cardheader">
              <img id="entrysprite" src={this.state.response.sprites.front_default} alt="sprite" />
              <h2 id="pokemonname">{this.state.response.name}</h2>
            </div>
            <hr />
            <h3>base stats</h3>
            hp: {this.state.response.stats[5].base_stat} <br/>
            attack: {this.state.response.stats[4].base_stat} <br/>
            defence: {this.state.response.stats[3].base_stat} <br/>
            special attack: {this.state.response.stats[2].base_stat} <br/>
            special defense: {this.state.response.stats[1].base_stat} <br/>
            speed: {this.state.response.stats[0].base_stat} <br/>
          </Modal>
        }
      </Grid>
    )
  }
}

export default App;
