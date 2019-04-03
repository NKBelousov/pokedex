import axios from "axios";

const API_ROOT = `https://pokeapi.co/api/v2`;

const axiosInstance = axios.create({
  baseURL: API_ROOT,
});

const responseResults = response => response.data.results;
const responseData = response => response.data;

const Pokemons = {
  fetchPokemon: name =>
    axiosInstance
      .request({
        url: `/pokemon/${name}`,
      })
      .then(responseData),
  fetchPokemons: () =>
    axiosInstance
      .request({
        url: `/pokemon/`,
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
