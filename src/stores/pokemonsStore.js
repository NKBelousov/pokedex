import { action, computed, observable } from "mobx";
import { chunk } from "lodash";

import agent from "../agent";

const POKEMON_MOCK = {
  abilities: [],
  base_experience: 0,
  moves: [],
  name: "charmeleon",
  sprites: {
    front_default: "",
  },
  stats: [],
  types: [],
  weight: 0,
};

export class PokemonsStore {
  @observable all = new Map();
  @observable count = 0;
  @observable currentPageIndex = 0;
  @observable itemsWithData = new Map();
  @observable search = "";

  @action fetchPokemons() {
    if (this.count !== 0) {
      return;
    }
    agent.Pokemons.fetchPokemons().then(pokemons => {
      this.count = pokemons.length;
      const map = new Map();
      pokemons.forEach(pokemon => {
        map.set(pokemon.name, pokemon);
      });
      this.all = map;
    });
  }

  @action fetchPokemon(name) {
    if (this.itemsWithData.has(name)) {
      return;
    }
    agent.Pokemons.fetchPokemon(name).then(pokemon => {
      this.itemsWithData.set(name, pokemon);
    });
  }

  getPokemon(name) {
    if (this.itemsWithData.has(name)) {
      return this.itemsWithData.get(name);
    } else {
      return POKEMON_MOCK;
    }
  }

  @computed get currentPage() {
    return this.paginated[this.currentPageIndex];
  }

  @action nextPage() {
    this.currentPageIndex = Math.min(
      this.currentPageIndex + 1,
      this.paginated.length - 1
    );
  }

  @action previousPage() {
    this.currentPageIndex = Math.max(0, this.currentPageIndex - 1);
  }

  @action setSearch(value) {
    this.search = value;
    this.currentPageIndex = 0;
  }

  @computed get filtered() {
    if (this.all.length === 0) {
      return [];
    }
    const regex = new RegExp(this.search, "i");
    const items = Array.from(this.all.values());
    return items.filter(item => regex.test(item.name));
  }

  @computed get paginated() {
    if (this.filtered.length > 0) {
      return chunk(this.filtered, 10);
    } else {
      return [[]];
    }
  }
}

export default new PokemonsStore();
