
import { LitElement, css, html } from '../../../deps/lit.js';
import { getStore, get } from '../../db/model.js';

class EnvoyageRootRoute extends LitElement {
  static properties = {
    screen: { attribute: false },
    component: { attribute: false },
  };

  constructor () {
    super();
    getStore('router').subscribe(({ screen, component }) => {
      this.screen = screen;
      this.component = component;
    });
  }

  render () {
    if (this.screen === 'main') return html`<nv-main></nv-main>`;
    return html`<nv-404></nv-404>`;
  }
}
customElements.define('nv-root-route', EnvoyageRootRoute);
