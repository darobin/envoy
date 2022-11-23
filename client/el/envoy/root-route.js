
import { LitElement, html } from '../../../deps/lit.js';
import { getStore } from '../../db/model.js';

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
    switch (this.screen) {
      case 'main':
        return html`<nv-main></nv-main>`;
      case 'create-identity':
        return html`<nv-create-identity></nv-create-identity>`;
      default:
        return html`<nv-404></nv-404>`;
    }
  }
}
customElements.define('nv-root-route', EnvoyageRootRoute);
