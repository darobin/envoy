
import { LitElement, css, html } from '../../../deps/lit.js';

class EnvoyHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #000;
      color: #fff;
      text-align: center;
      padding: 1.5rem 1rem 1rem 1rem;
    }
    :host h1 {
      font-weight: 100;
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`<header>
      <h1>envoy</h1>
      <slot></slot>
    </header>`;
  }
}
customElements.define('envoy-header', EnvoyHeader);
