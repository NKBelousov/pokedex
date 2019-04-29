import {
  action, autorun, computed, observable, set, toJS,
} from 'mobx';
import { chunk } from 'lodash';

import agent from '../agent';

const POKEMON_MOCK = {
  abilities: [],
  base_experience: 0,
  moves: [],
  name: '',
  sprites: {
    front_default: '',
  },
  stats: [],
  types: [],
  weight: 0,
};

const STORE_KEY = 'store';

export class PokemonsStore {
  @observable all = {};

  @observable count = 0;

  @observable currentPageIndex = 0;

  @observable itemsWithData = {};

  @observable search = '';

  constructor() {
    this.load();

    autorun(this.save.bind(this), {
      delay: 1000,
    });
  }

  @action fetchPokemons() {
    if (this.count !== 0) {
      return;
    }
    agent.Pokemons.fetchPokemons().then((pokemons) => {
      this.count = pokemons.length;
      const data = {};
      pokemons.forEach((pokemon) => {
        data[pokemon.name] = pokemon;
      });
      this.all = data;
    });
  }

  @action fetchPokemon(name) {
    if (this.itemsWithData[name]) {
      return;
    }
    agent.Pokemons.fetchPokemon(name).then((pokemon) => {
      this.itemsWithData[name] = pokemon;
    });
  }

  getPokemon(name) {
    if (this.itemsWithData[name]) {
      return this.itemsWithData[name];
    }
    return POKEMON_MOCK;
  }

  @computed get currentPage() {
    return this.paginated[this.currentPageIndex];
  }

  @action nextPage() {
    this.currentPageIndex = Math.min(
      this.currentPageIndex + 1,
      this.paginated.length - 1,
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
    const regex = new RegExp(this.search, 'i');
    const items = Array.from(Object.values(this.all));
    return items.filter(item => regex.test(item.name));
  }

  @computed get paginated() {
    if (this.filtered.length > 0) {
      return chunk(this.filtered, 10);
    }
    return [[]];
  }

  save() {
    const json = JSON.stringify(toJS(this));
    localStorage.setItem(STORE_KEY, json);
  }

  load() {
    const json = localStorage.getItem(STORE_KEY);
    if (json) {
      const data = JSON.parse(json);
      set(this, data);
    }
  }
}

export default new PokemonsStore();
