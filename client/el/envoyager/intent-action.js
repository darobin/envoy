
import { LitElement, html, css } from '../../../deps/lit.js';

class EnvoyagerIntentAction extends LitElement {
  static properties = {
    src: {},
    action: {},
    type: {},
    data: { attribute: false },
    onComplete: { attribute: false },
    onCancel: { attribute: false },
  };

  static styles = css`
    :host {
      /* display: block; */
      display: flex;
      align-items: stretch;
    }
    div {
      width: 100%;
    }
  `;

  constructor () {
    super();
    this.src = null;
    this.action = null;
    this.type = null;
    this.data = {};
    this.onComplete = ()=>{};
    this.onCancel = ()=>{};
  }

  debug (ev) {
    ev.target.previousElementSibling.openDevTools();
  }

  // webview attributes
  //  src (use loadSrc)
  //  preload - need one for intents injection ./src/preload-webview.js
  //  partition - set it to src
  //  executeJavaScript() to inject special nv-* elements that are available there
  render () {
    if (!this.src) return html`<nv-loading></nv-loading>`;
    let src = this.src;
    if (/^native:/.test(src)) src = src.replace(/^native:/, './client/intents/') + '.html';
    return html`<div>
      <webview src=${src} partition=${this.src} preload="./src/preload-webview.js" @intent-cancelled=${this.onCancel}></webview>
      <button @click=${this.debug}>debug</button>
    </div>`;
  }
}
customElements.define('nv-intent-action', EnvoyagerIntentAction);
