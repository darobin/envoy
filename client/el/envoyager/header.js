
import { LitElement, css, html, nothing } from '../../../deps/lit.js';
import { getStore } from '../../db/model.js';

class EnvoyagerHeader extends LitElement {
  static properties = {
    person: { attribute: false },
  };

static styles = css`
    :host {
      display: block;
      background: #000;
      color: #fff;
      text-align: center;
      padding: 1.5rem 1rem 1rem 1rem;
    }
    text {
      font-family: Lexend, monospace;
      font-size: 40px;
      font-variation-settings: "wght" 100;
      letter-spacing: 5px;
      fill: #fff;
    }
    tspan {
      opacity: 0.0;
    }
    path {
      stroke-width: 1px;
      stroke: #fff;
      fill: none;
    }
    path + path {
      stroke-width: 1.5px;
      stroke: var(--highlight);
    }
  `;

  constructor () {
    super();
    getStore('identities').subscribe(({ people = [] } = {}) => {
      console.warn(`PEOPLE CHANGE`, people);
      this.person = people[0] || null;
    });
  }

  render () {
    return html`<header>
      <svg width="276" height="50" viewport="0 0 400 50" id="logo">
        <text x="138" y="40" text-anchor="middle">envo<tspan>y</tspan>ager</text>
        <path d="
          M5,10 L118,10 M132,10 L269,10
          L269,47
          L205,47 M181,47 L142,47 M128,47 L5,47
          L5,10
        "></path>
        <path d="M122,2 L135,32 L147,18 L135,50"></path>
        <path d="M122,2 L132,37 L147,18 L135,50"></path>
      </svg>
      ${this.person ? html`<span style="color: red">${this.person.name}</span>` : nothing}
    </header>`;
  }
}
customElements.define('nv-header', EnvoyagerHeader);
