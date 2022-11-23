
import { registerStore, getStore, derived } from './model.js';

const defaultValue = { screen: undefined };
const store = derived(
    [
      getStore('identities'),
    ],
    updateRoute,
    defaultValue
  )
;

registerStore('router', store);

function updateRoute ([identities]) {
  if (!identities.people.length ) return { screen: 'create-identity' };
  return { screen: 'main'/*, component: 'home'*/ };
}
