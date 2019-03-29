import { Button, CssBaseline, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";

import SearchAppBar from "./components/SearchAppBar";
import PokemonList from "./components/PokemonList";

const styles = {
  buttons: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
};

@inject("pokemonStore")
@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }
  componentDidMount() {
    this.props.pokemonStore.fetchPokemons();
  }
  previousPage() {
    this.props.pokemonStore.previousPage();
  }
  nextPage() {
    this.props.pokemonStore.nextPage();
  }
  onSearchChange(event) {
    const { value } = event.target;
    this.props.pokemonStore.setSearch(value);
  }
  renderList() {
    const items = this.props.pokemonStore.currentPage;
    return <PokemonList items={items} />;
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        <SearchAppBar
          key="appbar"
          onChange={this.onSearchChange}
          value={this.props.pokemonStore.search}
        />
        <div className={classes.buttons}>
          <Button color="primary" onClick={this.previousPage}>
            Previous Page
          </Button>

          <Button color="primary" onClick={this.nextPage}>
            Next Page
          </Button>
        </div>
        {this.renderList()}
      </>
    );
  }
}

export default withStyles(styles)(App);
