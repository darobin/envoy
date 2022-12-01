
import { LitElement, css, html } from '../../../deps/lit.js';
import { getStore } from '../../db/model.js';

class EnvoyagerShowIdentity extends LitElement {
  static properties = {
    person: { attribute: false },
    people: { attribute: false },
    identity: {},
  };
  static styles = [css`
    :host {
      display: block;
      max-width: 50rem;
      margin: 2rem auto;
      --left-pad: calc(2rem + 142px);
    }
    #banner {
      height: 200px;
      background-color: var(--highlight);
      background-size: cover;
    }
    #avatar {
      height: 142px;
      width: 142px;
      margin: -42px auto auto 1rem;
      border-radius: 50%;
      background-color: #000;
      background-size: cover;
      border: 3px solid #fff;
    }
    pre {
      margin-top: 0;
      margin-left: var(--left-pad);
    }
    #name {
      display: block;
      margin: -100px 0 auto var(--left-pad);
      width: calc(100% - var(--left-pad));
      font-size: 2rem;
      font-family: var(--heading-font);
      font-weight: 200;
      font-variation-settings: "wght" 200;
      letter-spacing: 1px;
    }
    nv-feed-list {
      margin-left: var(--left-pad);
      margin-top: 2rem;
    }
  `];

  constructor () {
    super();
    this.identity = null;
    getStore('identities').subscribe(({ people = [] } = {}) => {
      this.people = people;
    });
  }

  willUpdate (props) {
    if (props.has('identity') || props.has('people')) {
      this.person = this.people.find(p => p.$id === this.identity) || null;
    }
  }

  render () {
    const url = this.person?.url || '';
    return html`<div>
      <div id="banner" style=${url && this.person?.banner?.src ? `background-image: url(${url}/banner/src)` : ''}></div>
      <div id="avatar" style=${url && this.person?.avatar?.src ? `background-image: url(${url}/avatar/src)` : ''}></div>
      <h2 id="name">${this.person?.name || 'Nameless Internet Entity'}</h2>
      <pre>${this.person?.$id}</pre>
      <nv-feed-list src=${this.person?.feed} addable></nv-feed-list>
    </div>`;
  }
}
customElements.define('nv-show-identity', EnvoyagerShowIdentity);
