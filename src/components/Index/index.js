import { Button, withStyles } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";

import SearchAppBar from "./../SearchAppBar";
import PokemonList from "./../PokemonList";
import views from "./../../views";

const styles = {
  buttons: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
};

@inject("store")
@observer
class Index extends Component {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.openProfile = this.openProfile.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }
  componentDidMount() {
    this.props.store.pokemonsStore.fetchPokemons();
  }
  previousPage() {
    this.props.store.pokemonsStore.previousPage();
  }
  nextPage() {
    this.props.store.pokemonsStore.nextPage();
  }
  onSearchChange(event) {
    const { value } = event.target;
    this.props.store.pokemonsStore.setSearch(value);
  }
  openProfile(name) {
    this.props.store.router.goTo(views.profile, { name });
  }
  renderList() {
    const items = this.props.store.pokemonsStore.currentPage;
    return <PokemonList items={items} navigate={this.openProfile} />;
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <SearchAppBar
          key="appbar"
          onChange={this.onSearchChange}
          value={this.props.store.pokemonsStore.search}
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

export default withStyles(styles)(Index);