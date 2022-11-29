
import { registerStore, getStore, derived } from './model.js';

const defaultValue = { screen: undefined };
const store = derived(
    [
      getStore('identities'),
      getStore('navigation'),
    ],
    updateRoute,
    defaultValue
  )
;

registerStore('router', store);

function updateRoute ([identities, navigation]) {
  if (!identities.people.length ) return { screen: 'create-identity' };
  return navigation;
}
