import axios from "axios";

const API_ROOT = `https://pokeapi.co/api/v2`;

const responseResults = response => response.data.results;

const Pokemons = {
  fetchPokemons: () =>
    axios
      .request({
        url: `${API_ROOT}/pokemon/`,
        params: {
          offset: 0,
          limit: Number.MAX_SAFE_INTEGER,
        },
      })
      .then(responseResults),
};

export default {
  Pokemons,
};
