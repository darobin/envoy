
import { registerStore, getStore, derived } from './model.js';

let defaultValue = { screen: undefined }
  , store = derived(
      [
        getStore('user'),
      ],
      updateRoute,
      defaultValue
    )
;

registerStore('router', store);

function updateRoute ([user]) {
  if (user.state !== 'in') return { screen: 'login' };
  return { screen: 'news', component: 'home' };
}
