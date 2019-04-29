import PropTypes from 'prop-types';

export default PropTypes.shape({
  getPokemon: PropTypes.func.isRequired,
  fetchPokemon: PropTypes.func.isRequired,
  fetchPokemons: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  currentPage: PropTypes.array.isRequired,
  paginated: PropTypes.array.isRequired,
  filtered: PropTypes.array.isRequired,
  load: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
});
