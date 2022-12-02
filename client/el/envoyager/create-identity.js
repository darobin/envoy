
import { LitElement, css, html, nothing } from '../../../deps/lit.js';
import { buttonStyles } from '../../button-styles.js';
import { formStyles } from '../../form-styles.js';
import { getStore } from '../../db/model.js';
import { initIdentities }  from '../../db/identities.js';

class EnvoyagerCreateIdentity extends LitElement {
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
    #did {
      font-family: monospace;
    }
    .error-message {
      margin-left: var(--left-pad);
    }
  `, formStyles, buttonStyles];

  constructor () {
    super();
    this.banner = null;
    this.avatar = null;
    this.errMsg = null;
  }

  async formHandler (ev) {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const data = {};
    for (let [key, value] of fd.entries()) {
      data[key] = value;
    }
    for (const k of ['avatar', 'banner']) {
      if (!this[k]) continue;
      data[k] = {
        mediaType: this[k].type,
        buffer: await this[k].arrayBuffer(),
      };
    }
    console.warn(data);
    this.errMsg = await window.envoyager.createIdentity(data);
    const nav = getStore('navigation');
    if (this.errMsg) this.requestUpdate();
    else {
      await initIdentities();
      nav.go('show-identity', { id: data.did });
    }
  }

  render () {
    const err = this.errMsg ? html`<div class="error-message">${this.errMsg}</div>` : nothing;
    return html`<nv-box title="Create Identity">
      <form @submit=${this.formHandler}>
        <nv-image-drop id="banner" @image-dropped=${(e) => this.banner = e.detail.imageFile}></nv-image-drop>
        <nv-image-drop id="avatar" @image-dropped=${(e) => this.avatar = e.detail.imageFile}></nv-image-drop>
        <input type="text" id="name" name="name" placeholder="name" required>
        <div class="form-line">
          <label for="did">DID</label>
          <input type="text" id="did" name="did"  placeholder="did:…" required pattern="^did:[\\w-]+:\\S+">
        </div>
        ${err}
        <div class="form-action">
          <button type="submit">Create</button>
        </div>
      </form>
    </nv-box>`;
  }
}
customElements.define('nv-create-identity', EnvoyagerCreateIdentity);
