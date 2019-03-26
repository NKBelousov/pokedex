import axios from "axios";

const API_ROOT = `https://pokeapi.co/api/v2`;

const responseBody = response => response.data;
const results = response => response.results;

const Pokemons = {
  get: id => axios.get(`${API_ROOT}/pokemon/${id}`).then(responseBody),
  collection: (page, limit) =>
    axios
      .request({
        method: `GET`,
        url: `${API_ROOT}/pokemon`,
        params: {
          limit,
          offset: page * limit,
        },
      })
      .then(responseBody)
      .then(results),
};

export default {
  Pokemons,
};
