
import { LitElement, css, html } from '../../../deps/lit.js';

class EnvoyagerReload extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      right: 0;
      opacity: 0.5;
    }
    button {
      border: none;
      font-size: 0.8rem;
    }
  `;

  constructor () {
    super();
  }

  reload () {
    document.location.reload();
  }

  render () {
    return html`<button @click=${this.reload}>reload</button>`;
  }
}
customElements.define('nv-reload', EnvoyagerReload);
