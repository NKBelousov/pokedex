import {
  AppBar,
  Chip,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import PokemonsStore from '~/prop-types/PokemonsStore';
import views from '~/views';

const IMG_SIZE = '140px';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
  content: {
    textAlign: 'center',
    margin: '20px',
  },
  image: {
    background: theme.palette.grey[200],
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '3px',
    padding: '20px',
    minHeight: IMG_SIZE,
    minWidth: IMG_SIZE,
  },
});

@inject('store')
@observer
class Profile extends Component {
  static get propTypes() {
    return {
      classes: PropTypes.object.isRequired,
      store: PropTypes.shape({
        pokemonsStore: PokemonsStore,
        router: PropTypes.shape({
          goTo: PropTypes.func.isRequired,
        }).isRequired,
      }).isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.return = this.return.bind(this);
  }

  componentDidMount() {
    this.props.store.pokemonsStore.fetchPokemon(this.getName());
  }

  getName() {
    const {
      router: {
        params: { name },
      },
    } = this.props.store;
    return name;
  }

  getPokemon() {
    return this.props.store.pokemonsStore.getPokemon(this.getName());
  }

  return() {
    this.props.store.router.goTo(views.index);
  }

  renderAbilities() {
    const { classes } = this.props;
    const items = this.getPokemon().abilities.map((ability) => {
      const {
        ability: { name },
      } = ability;
      return (
        <Chip
          key={name}
          label={name}
          className={classes.chip}
          variant="outlined"
        />
      );
    });
    if (items.length === 0) {
      return undefined;
    }
    return (
      <>
        <Typography align="center" variant="headline" noWrap>
          ABILITIES:
        </Typography>
        <div>{items}</div>
      </>
    );
  }

  render() {
    const { classes } = this.props;
    const image = this.getPokemon().sprites.front_default;
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Pokedex
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <IconButton className={classes.backButton} onClick={this.return}>
            <Typography variant="subtitle2" color="primary">
              Back To List
            </Typography>
          </IconButton>
          <Typography align="center" variant="h5" noWrap>
            {this.getName().toUpperCase()}
          </Typography>
          <img className={classes.image} alt={this.getName()} src={image} />
          <Typography align="center" variant="subtitle1" noWrap>
            Base Experience:
            {' '}
            {this.getPokemon().base_experience}
          </Typography>
          <Typography align="center" variant="subtitle1" noWrap>
            Weight:
            {' '}
            {this.getPokemon().weight}
          </Typography>
          {this.renderAbilities()}
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Profile);
