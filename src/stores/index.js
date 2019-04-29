import { RouterStore } from 'mobx-router';

import pokemonsStore from './pokemonsStore';

export default {
  pokemonsStore,
  router: new RouterStore(),
};
