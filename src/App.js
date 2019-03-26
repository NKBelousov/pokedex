import { inject } from "mobx-react";
import { Component } from "react";

@inject("pokemonStore")
export default class App extends Component {
  render() {
    return "Hello, Pokedex!";
  }
}
