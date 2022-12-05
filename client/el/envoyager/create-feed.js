
import { LitElement, css, html, nothing } from '../../../deps/lit.js';
import { buttonStyles } from '../../button-styles.js';
import { formStyles } from '../../form-styles.js';

class EnvoyagerCreateFeed extends LitElement {
  static styles = [css`
    :host {
      display: block;
    }
    .form-line {
      margin-left: 1rem;
      margin-right: 1rem;
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
    this.errMsg = data.name ? null : 'Name is required.';

    if (this.errMsg) this.requestUpdate();
    else {
      window.envoyager.signalCreateFeed(data);
    }
  }

  cancel () {
    window.envoyager.signalIntentCancelled();
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
