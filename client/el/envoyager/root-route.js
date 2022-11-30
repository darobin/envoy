
import { LitElement, html } from '../../../deps/lit.js';
import { getStore } from '../../db/model.js';

class EnvoyagerRootRoute extends LitElement {
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
      case 'show-identity':
        return html`<nv-show-identity identity=${this.params.id}></nv-show-identity>`;
      default:
        return html`<nv-404></nv-404>`;
    }
  }
}
customElements.define('nv-root-route', EnvoyagerRootRoute);
