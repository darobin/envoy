
import { LitElement, css, html } from '../../../deps/lit.js';

class EnvoyButton extends LitElement {
 static styles = css`
    :host {
      display: block;
      padding-top: 1rem;
    }
    button {
      position: relative;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 2.5em;
      line-height: 2.375em;
      font-family: helvetica, arial, sans-serif;
      font-size: 1em;
      font-weight: 700;
      cursor: pointer;
      border: 0.0625em solid rgb(18, 18, 18);
      border-radius: 0.2em;
      box-sizing: border-box;
      user-select: none;
      background-image: none;
      /* color: rgb(255, 255, 255); */
      background-color: rgb(18, 18, 18);
      transition: all 0.15s ease-in 0s;

      /* black button */
      background-color: rgb(51, 51, 51);
      border-color: rgb(51, 51, 51);
      color: rgb(255, 255, 255);
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`
      <button><slot></slot></button>
    `;
  }
}
customElements.define('envoy-button', EnvoyButton);
