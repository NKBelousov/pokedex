import { List, ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const PokemonList = memo(props => (
  <List dense>
    {props.items.map((pokemon) => {
      const { name } = pokemon;
      const cb = () => props.navigate(name);
      return (
        <ListItem button key={name} onClick={cb}>
          <ListItemText primary={name} />
        </ListItem>
      );
    })}
  </List>
));

PokemonList.propTypes = {
  navigate: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

PokemonList.displayName = 'PokemonList';

export default PokemonList;
