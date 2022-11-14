
import { registerStore, writable } from './model.js';

let defaultValue = { state: 'out', name: '', cookie: undefined }
  , store = writable(defaultValue)
;

registerStore('user', store);

export function login (username, password) {
  store.set({ state: 'loading' });
  setTimeout(() => store.set({ state: 'in', name: 'Robin', cookie: 'xxx' }), 2000);
}

export function logout () {
  store.set(defaultValue);
}
