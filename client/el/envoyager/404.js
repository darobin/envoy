
import { LitElement, css, html } from '../../../deps/lit.js';

class Envoyager404 extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: #f00;
      text-align: center;
      padding: 1.5rem 1rem 1rem 1rem;
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`<p>Not all those who wander are lost, but it looks like <em>you</em> are.</p>`;
  }
}
customElements.define('nv-404', Envoyager404);
