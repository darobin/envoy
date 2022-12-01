
import { LitElement, css, html } from '../../../deps/lit.js';

class EnvoyagerMain extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`<div>
      Drop Envoy here.
      <slot></slot>
    </div>`;
  }
}
customElements.define('nv-main', EnvoyagerMain);
