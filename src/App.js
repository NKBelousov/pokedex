import { CssBaseline } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";

import SearchAppBar from "./components/SearchAppBar";

@inject("pokemonStore")
@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onSearchChange(event) {
    const { value } = event.target;
    this.props.pokemonStore.setSearch(value);
  }
  render() {
    return (
      <>
        <CssBaseline />
        <SearchAppBar
          onChange={this.onSearchChange}
          value={this.props.pokemonStore.search}
        />
      </>
    );
  }
}

export default App;
