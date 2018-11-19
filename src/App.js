import React, { Component } from 'react';
import logo from './pokeball.svg';
import closeButton from './close.svg';
import infoButton from './info.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-modal';

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

class App extends Component {
  constructor(props){
    super(props);
    this.state = { showModal: false, lightMode: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    /*this.toggleLightMode = this.toggleLightMode.bind(this);*/
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  /*toggleLightMode() {
    var newLightMode = !this.state.lightMode;
    this.setState({lightMode: newLightMode});
    if(newLightMode) {
      document.documentElement.style.background = "#ffffff";

      var thumbs = document.querySelectorAll('.thumb');
      for (var i = 0; i < thumbs.length; i++)
        thumbs[i].id = "thumbLight";

      var cards = document.querySelectorAll('.card');
      for (var i = 0; i < cards.length; i++)
        cards[i].id = "cardLight";
    }
    else {
      document.documentElement.style.background = "#212121";

      var thumbs = document.querySelectorAll('.thumb');
      for (var i = 0; i < thumbs.length; i++)
        thumbs[i].id = "thumbDark";

      var cards = document.querySelectorAll('.card');
      for (var i = 0; i < cards.length; i++)
        cards[i].id = "cardDark";
    }
  }*/

  render() {
    return (
      <div className="App">
          <header>
            <br />
            <button class="infoButton" onClick={this.handleOpenModal}><img class="imageButton"src={infoButton} alt="info"/></button>
              <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className="cardDark" id="cardDark" overlayClassName="overlay">
                <br />
                light mode  <label class="switch">
                  <input type="checkbox" /*onClick={this.toggleLightMode}*/ />
                  <span class="slider round"></span>
                </label>
              </Modal>
            <img id ="HeaderImage" src={logo} alt="logo" />
            <p id="HeaderText">
              pokézu
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
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Grid item>
        <button class="thumb" id="thumbDark" onClick={this.handleOpenModal}>
          {this.state.response ? <img id="sprite" className="App-logo" src={this.state.response.sprites.front_default || logo} alt="sprite" />: <img id="sprite" className="loadingIcon" src={logo} alt="loading" />}
          <br />
          {this.state.response ? this.state.response.name: "loading"}
        </button>
        {this.state.response &&
          <Modal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} className="cardDark" id="cardDark" overlayClassName="overlay">
          <button id="closebutton" onClick={this.handleCloseModal}><img class="imageButton" src={closeButton} alt="close"/></button>
            <div id="cardheader">
              <img id="entrysprite" src={this.state.response.sprites.front_default} alt="sprite" />
              <h2 id="pokemonname">{this.state.response.name}</h2>
              {this.state.response.types.length === 1? <div class="type" id={this.state.response.types[0].type.name}>{this.state.response.types[0].type.name}</div>: <div><div class="type" id={this.state.response.types[1].type.name}>{this.state.response.types[1].type.name}</div>  <div class="type" id={this.state.response.types[0].type.name}>{this.state.response.types[0].type.name}</div></div>}
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
