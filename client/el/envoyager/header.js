
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
    header {
      position: relative;
    }
    #person {
      position: absolute;
      right: 0;
      top: 0;
    }
    #person button {
      margin: 0;
      padding: 0;
      background: transparent;
      border: 2px solid #fff;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      cursor: pointer;
      user-select: none;
      transition: all 0.15s ease-in 0s;
    }
    #person button:hover {
      border-color: var(--highlight);
    }
    #person img {
      border-radius: 50%;
    }
  `;

  constructor () {
    super();
    getStore('identities').subscribe(({ people = [] } = {}) => {
      this.person = people[0] || null;
    });
    this.nav = getStore('navigation');
  }

  goToPerson () {
    this.nav.go('show-identity', { id: this.person.$id });
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
      ${
        this.person
        ? html`<div id="person">
            <button @click=${this.goToPerson}><img src=${`${this.person.url}/avatar/src`} width="50" height="50" alt=${this.person.name}></button>
          </div>`
        : nothing
      }
    </header>`;
  }
}
customElements.define('nv-header', EnvoyagerHeader);
