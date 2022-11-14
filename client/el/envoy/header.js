
import { LitElement, css, html } from '../../../deps/lit.js';

class EnvoyHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #000;
      text-align: center;
      padding: 1.5rem 1rem 1rem 1rem;
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`<header>
      <img src="./img/slic.svg" width="36" height="36">
      <slot></slot>
    </header>`;
  }
}
customElements.define('envoy-header', EnvoyHeader);
