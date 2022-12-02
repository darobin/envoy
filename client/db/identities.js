
import { registerStore, writable } from './model.js';

const defaultValue = { state: 'initial', people: [], err: null };
const store = writable(defaultValue);

registerStore('identities', store);

export async function initIdentities () {
  store.set({ state: 'loading', people: [] });
  try {
    const ipnsList = await window.envoyager.loadIdentities();
    const resList = await Promise.all(ipnsList.map(({ ipns }) => fetch(`ipns://${ipns}`, { headers: { Accept: 'application/json' }})));
    const people = (await Promise.all(resList.map(r => r.json()))).map((p, idx) => ({...p, url: `ipns://${ipnsList[idx].ipns}`}));
    store.set({ state: 'loaded', people });
  }
  catch (err) {
    store.set({ state: 'error', people: [], err });
  }
}
