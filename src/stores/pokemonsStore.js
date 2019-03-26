import { action, observable } from "mobx";

export class PokemonsStore {
  @observable search = "";

  @action setSearch(value) {
    this.search = value.trim();
  }
}

export default new PokemonsStore();
