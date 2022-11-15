
import { LitElement, css, html } from '../../../deps/lit.js';


// webviewTag boolean (optional) - Whether to enable the <webview> tag. Defaults to false. Note: The preload script
// configured for the <webview> will have node integration enabled when it is executed so you should ensure
// remote/untrusted content is not able to create a <webview> tag with a possibly malicious preload script. You can
// use the will-attach-webview event on webContents to strip away the preload script and to validate or alter the
// <webview>'s initial settings.
class EnvoyCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    div, webview {
      display: flex;
      width: 100%;
      height: 100%;
    }
  `;

  static properties = {
    src: { type: String },
  };

  constructor () {
    super();
  }

  render () {
    return html`<div><webview src=${this.src}></webview></div>`;
  }
}
customElements.define('envoy-card', EnvoyCard);
