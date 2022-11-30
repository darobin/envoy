
import { LitElement, css, html } from '../../../deps/lit.js';
import { buttonStyles } from './button-styles.js';
// import { getStore } from '../../db/model.js';

class EnvoyagerShowIdentity extends LitElement {
  static styles = [css`
    :host {
      display: block;
      max-width: 50rem;
      margin: 2rem auto;
      --left-pad: calc(2rem + 142px);
    }
    #banner {
      height: 200px;
    }
    #avatar {
      height: 142px;
      width: 142px;
      margin: -42px auto auto 1rem;
      border-radius: 50%;
    }
    .form-line {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 1rem;
      margin-left: var(--left-pad);
    }
    .form-action {
      text-align: right;
      /* border: 1px solid #000; */
      padding: 1px;
      margin-top: 2rem;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      transition: all 0.5s;
    }
    input:focus {
      border-color: var(--highlight);
    }
    input:not(:blank):invalid {
      border-color: var(--error);
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
    .form-line > label {
      flex-basis: 150px;
    }
    .form-line > input {
      flex-grow: 1;
    }
    #did {
      font-family: monospace;
    }
    .error-message {
      color: var(--error);
    }
`, buttonStyles];

  constructor () {
    super();
  }

  async formHandler () {
  }

  render () {
    return html`<p>Identity!</p>`;
  }
}
customElements.define('nv-show-identity', EnvoyagerShowIdentity);
