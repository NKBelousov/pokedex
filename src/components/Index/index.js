import { Button, withStyles, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import PokemonList from '~/components/PokemonList';
import PokemonsStore from '~/prop-types/PokemonsStore';
import SearchAppBar from '~/components/SearchAppBar';
import views from '~/views';

const styles = {
  buttons: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

@inject('store')
@observer
class Index extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      store: PropTypes.shape({
        pokemonsStore: PokemonsStore.isRequired,
        router: PropTypes.shape({
          goTo: PropTypes.func.isRequired,
        }),
      }).isRequired,
    };
  }

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

  onSearchChange(event) {
    const { value } = event.target;
    this.props.store.pokemonsStore.setSearch(value);
  }

  nextPage() {
    this.props.store.pokemonsStore.nextPage();
  }

  previousPage() {
    this.props.store.pokemonsStore.previousPage();
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
    const pageIndex = this.props.store.pokemonsStore.currentPageIndex + 1;
    const pageCount = this.props.store.pokemonsStore.paginated.length;
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

          <Typography variant="h5">
            Page
            {' '}
            {pageIndex}
            {' '}
            of
            {' '}
            {pageCount}
          </Typography>

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
