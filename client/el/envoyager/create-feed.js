
import { LitElement, css, html, nothing } from '../../../deps/lit.js';
import { buttonStyles } from '../../button-styles.js';
import { formStyles } from '../../form-styles.js';

class EnvoyagerCreateFeed extends LitElement {
  static styles = [css`
    :host {
      display: block;
    }
  `, formStyles, buttonStyles];

  constructor () {
    super();
  }

  async formHandler (ev) {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const data = {};
    for (let [key, value] of fd.entries()) {
      data[key] = value;
    }
    console.warn(data);
    this.errMsg = await window.envoyager.createIdentity(data);

    if (this.errMsg) this.requestUpdate();
    else {
      // XXX
      // handle success
      // send a message to the backend with the data needed to create a feed, set its creator, add it to the right parent
      // event up
      //
      // CURRENT STATUS
      //  - style for creation form is off
      //  - need to figure out how to dispatch events up from a webview
      //  - need to add a createFeed() to the preload (for webviews) that does the right things and fakes WICAN security
      //  - event back completion so the feed can reload
    }
  }

  cancel () {
    const cev = new CustomEvent('intent-cancelled', {
      bubbles: true,
      composed: true,
      detail: {},
    });
    window.dispatchEvent(cev);
  }

  render () {
    const err = this.errMsg ? html`<div class="error-message">${this.errMsg}</div>` : nothing;
    return html`<form @submit=${this.formHandler}>
      <div class="form-line">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="name" required>
      </div>
      ${err}
      <div class="form-action">
        <button type="reset" @click=${this.cancel}>Cancel</button>
        <button type="submit">Create</button>
      </div>
    </form>`;
  }
}
customElements.define('nv-create-feed', EnvoyagerCreateFeed);
