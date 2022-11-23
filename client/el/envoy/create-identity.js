
import { LitElement, css, html } from '../../../deps/lit.js';

class EnvoyageCreateIdentity extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 50rem;
      margin: 2rem auto;
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`<nv-box title="Create Identity">
      <p>This is content…</p>
    </nv-box>`;
  }
}
customElements.define('nv-create-identity', EnvoyageCreateIdentity);
