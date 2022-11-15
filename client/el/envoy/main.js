
import { LitElement, css, html } from '../../../deps/lit.js';

class EnvoyHeader extends LitElement {
  static styles = css`
    :host {
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`<div>
      Drop Envoy here.
    </div>`;
  }
}
customElements.define('envoy-main', EnvoyHeader);
