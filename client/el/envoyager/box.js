
import { LitElement, css, html } from '../../../deps/lit.js';

class EnvoyagerBox extends LitElement {
  static properties = {
    title: String,
  };

static styles = css`
    :host {
      display: block;
      max-width: 100%;
    }
    header {
      color: #fff;
      border: 3px double #000;
    }
    h2 {
      background: #000;
      font-family: var(--heading-font);
      font-variation-settings: "wght" 150;
      letter-spacing: 2px;
      margin: 0;
      padding: 0.2rem 0.4rem;
    }
  `;

  constructor () {
    super();
    this.title = 'Untitled Box'
  }

  render () {
    return html`<section>
      <header><h2>${this.title}</h2></header>
      <slot></slot>
    </section>`;
  }
}
customElements.define('nv-box', EnvoyagerBox);
