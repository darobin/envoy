
import { LitElement, css, html, nothing } from '../../../deps/lit.js';
import { buttonStyles } from './button-styles.js';

class EnvoyageCreateIdentity extends LitElement {
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
    .error-list {
      color: var(--error);
    }
`, buttonStyles];

  constructor () {
    super();
    this.bannerFile = null;
    this.avatarFile = null;
  }

  formHandler (ev) {
    const fd = new FormData(ev.target);
    const data = {};
    for (let [key, value] of fd.entries()) {
      console.warn(key, value);
      data[key] = value;
    }
    ev.preventDefault();
  }
  // XXX
  // we need to:
  // - [ ] write, wire, and manage the form
  // - [ ] save the data back to the store
  // - [ ] generate a key pair for this identity, and have a store (back and front) for it, wired
  // - [ ] reload identities so that the app changes state
  // - [ ] the created identity needs to get stored on IPFS
  //    - [ ] a derived key needs to be created and used to produce an IPNS name pointing to that person's IPLD
  //      - [ ] this wrangling of IPNS with derived keys created for each name is generic, needs a local store, lib, etc.
  //    - [ ] the IPNS needs to be made available for copying from the UI
  //    - [ ] it also needs to be generally available in the store so it can be the creator field (until we figure out which DID to use)
  // - [ ] when we create an IPNS for feeds, we can also make a QR code for them, to be easily followed!
  //
  // in the below:
  //  - have the form and its handling here, super simple native-based stuff with FormData and submit, none of that crap
  //    with wiring
  render () {
    const err = this.errors ? html`<ul class="error-list">${this.errors}</ul>` : nothing;
    return html`<nv-box title="Create Identity">
      <form @submit=${this.formHandler}>
        <nv-image-drop id="banner" @image-dropped=${(e) => this.bannerFile = e.detail.imageFile}></nv-image-drop>
        <nv-image-drop id="avatar" @image-dropped=${(e) => this.avatarFile = e.detail.imageFile}></nv-image-drop>
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
customElements.define('nv-create-identity', EnvoyageCreateIdentity);
