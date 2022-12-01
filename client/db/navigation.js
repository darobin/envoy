
import { registerStore, writable } from './model.js';

const defaultValue = { screen: 'main', params: {} };
const store = writable(defaultValue);

store.go = (screen = 'main', params = {}) => {
  let hash = screen;
  if (Object.keys(params).length) {
    hash += '|' + Object.keys(params).sort().map(k => `${k}=${encodeURIComponent(params[k])}`).join('&');
  }
  if (window.location.hash === `#${hash}`) return;
  window.location.hash = `#${hash}`;
  store.set({ screen, params });
};
window.addEventListener('load', () => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const [screen, rest] = hash.split('|');
    const params = {};
    if (rest) {
      rest.split('&').forEach(part => {
        const [k, v] = part.split('=', 2);
        params[k] = decodeURIComponent(v);
      });
    }
    store.set({ screen, params });
  }
})

registerStore('navigation', store);
// XXX on set this should change the hash, and on load it should restore from the hash
