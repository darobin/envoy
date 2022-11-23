
import { registerStore, writable } from './model.js';

const defaultValue = { state: 'initial', people: [], err: null };
const store = writable(defaultValue);

registerStore('identities', store);

export async function initIdentities () {
  store.set({ state: 'loading', people: [] });
  try {
    const people = await window.envoyage.loadIdentities();
    store.set({ state: 'loaded', people });
  }
  catch (err) {
    store.set({ state: 'error', people: [], err });
  }
}

// export function login (username, password) {
//   store.set({ state: 'loading' });
//   setTimeout(() => store.set({ state: 'in', name: 'Robin', cookie: 'xxx' }), 2000);
// }

// export function logout () {
//   store.set(defaultValue);
// }
