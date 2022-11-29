
import { registerStore, writable } from './model.js';

const defaultValue = { screen: 'main', params: {} };
const store = writable(defaultValue);

registerStore('navigation', store);
