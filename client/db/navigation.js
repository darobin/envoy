
import { registerStore, writable } from './model.js';

const defaultValue = { screen: 'main', params: {} };
const store = writable(defaultValue);

registerStore('navigation', store);
// XXX on set this should change the hash, and on load it should restore from the hash
