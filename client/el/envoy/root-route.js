
import { LitElement, css, html } from '../../../deps/lit.js';
import { getStore, get } from '../../db/model.js';

class EnvoyRootRoute extends LitElement {
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
    if (this.screen === 'main') return html`<envoy-main></envoy-main>`;
    return html`<envoy-404></envoy-404>`;
  }
}
customElements.define('envoy-root-route', EnvoyRootRoute);
