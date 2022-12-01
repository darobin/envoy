
import { LitElement, html } from '../../../deps/lit.js';
import { getStore } from '../../db/model.js';

class EnvoyagerRootRoute extends LitElement {
  static properties = {
    screen: { attribute: false },
  };

  constructor () {
    super();
    getStore('router').subscribe(({ screen = 'main', params = {} } = {}) => {
      this.screen = screen;
      this.params = params;
    });
  }

  render () {
    console.warn(`rendering ${this.screen}(${JSON.stringify(this.params)})`);
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
