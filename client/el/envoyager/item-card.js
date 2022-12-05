
import { LitElement, css, html, nothing } from '../../../deps/lit.js';
import { buttonStyles } from '../../button-styles.js';

class EnvoyagerItemCard extends LitElement {
  static properties = {
    src: {},
    data: { attribute: false },
    creator: { attribute: false },
    loading: { attribute: false },
    creatorLoading: { attribute: false },
  };
  static styles = [css`
    :host {
      display: block;
    }
    #root:hover {
      background: var(--lightest-bg);
    }
    .clickable {
      cursor: pointer;
    }
    #creator {
      padding: 0.5rem;
      display: flex;
      align-items: center;
    }
    #creator img {
      border-radius: 50%;
      margin-right: 1rem;
    }
    #creator span {
      font-family: var(--heading-font);
      font-variation-settings: "wght" 400;
    }
    #content {
      padding: 0rem 0.5rem 0.5rem calc(1.5rem + 32px)
    }
    #banner {
      width: 100%;
      min-width: 504px;
      height: 264px;
      background-size: cover;
      background-position: center;
    }
    h2 {
      font-family: var(--heading-font);
      font-size: 1.4rem;
      margin: 0;
    }
    #actions {
      text-align: right;
      padding-bottom: 2rem;
    }
  `, buttonStyles];

  constructor () {
    super();
    this.src = null;
    this.data = {};
    this.creator = {};
    this.loading = false;
    this.creatorLoading = false;
  }

  willUpdate (props) {
    if (props.has('src')) this.refresh();
  }

  refresh () {
    console.warn(`Loading ${this.src}…`);
    this.loading = true;
    fetch(this.src, { headers: { Accept: 'application/json' }})
      .then((r) => r.json())
      .then((data) => {
        this.loading = false;
        this.data = data;
        if (data.creator) {
          this.creatorLoading = true;
          fetch(data.creator, { headers: { Accept: 'application/json' }})
            .then((r) => r.json())
            .then((creator) => {
              this.creatorLoading = false;
              this.creator = creator;
            })
          ;
        }
      })
    ;
  }

  showFeed (e) {
    alert(`Navigate to feed ${this.data.url}`);
    e.stopPropagation();
  }

  openFullItem (e) {
    alert(`Open item in full ${this.data.src}`);
    e.stopPropagation();
  }

  installIntent (e) {
    alert(`Install intent ${this.data.intent}`);
    e.stopPropagation();
  }

  saveItem (e) {
    alert(`Save or install item ${this.data.url} to a feed`);
    e.stopPropagation();
  }

  render () {
    if (this.loading) return html`<div><nv-loading></nv-loading></div>`;
    let banner = nothing;
    if (this.data?.banner?.src) {
      banner = html` <div id="banner" style=${this.data?.banner?.src ? `background-image: url(${this.data.banner.src})` : ''}></div>`;
    }
    let creator = nothing;
    if (this.creatorLoading) {
      creator = html`<nv-loading></nv-loading>`;
    }
    else if (this.creator) {
      creator = this.creator?.name || 'Unknown Entity';
    }
    const noop = () => {};
    let clickAction;
    let actions = [];
    if (this.data?.$type === 'Feed') {
      clickAction = (e) => this.showFeed(e);
      actions.push(html`<button @click=${clickAction} class="small discreet"><img src="img/feed-icon.svg" width="24" height="24" alt="View Feed"></button>`);
    }
    if (this.data?.src) {
      clickAction = (e) => this.openFullItem(e);
      actions.push(html`<button @click=${clickAction} class="small discreet"><img src="img/maxi-icon.svg" width="24" height="24" alt="Open Item"></button>`);
    }
    if (this.data?.intent) {
      actions.push(html`<button @click=${(e) => this.installIntent(e)} class="small discreet"><img src="img/install-intent-icon.svg" width="24" height="24" alt="Open Item"></button>`);
    }
    actions.push(html`<button @click=${(e) => this.saveItem(e)} class="small discreet"><img src="img/save-icon.svg" width="24" height="24" alt="Save Item"></button>`);

    return html`<div id="root" class=${clickAction ? 'clickable' : ''} @click=${clickAction || noop}>
      <div id="creator">
        <img src=${`${this.data?.creator}/avatar/src`} width="32" height="32" alt=${this.data?.creator?.name}>
        <span>${creator}</span>
      </div>
      <div id="content">
        ${banner}
        ${
          this.data?.name
          ? html`<h2>${this.data?.name}</h2>`
          : nothing
        }
        ${
          this.data?.description
          ? html`<p>${this.data.description}</p>`
          : nothing
        }
      </div>
      <div id="actions">${actions}</div>
    </div>`;
  }
}
customElements.define('nv-item-card', EnvoyagerItemCard);
