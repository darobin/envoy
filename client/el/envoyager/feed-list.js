
import { LitElement, css, html, nothing } from '../../../deps/lit.js';
import { buttonStyles } from '../../button-styles.js';

class EnvoyagerFeedList extends LitElement {
  static properties = {
    src: {},
    data: { attribute: false },
    user: { attribute: false },
    addable: { type: Boolean },
    creator: { type: Boolean },
    loading: { attribute: false },
  };
  static styles = [css`
    :host {
      display: block;
    }
    #creator {
      text-align: right;
    }
    #creator img {
      border-radius: 50%;
    }
    #actions {
      text-align: right;
    }
    nv-item-card {
      border-bottom: 1px solid var(--lightest);
    }
    nv-item-card:last-of-type {
      border-bottom: none;
    }
  `, buttonStyles];

  constructor () {
    super();
    this.src = null;
    this.data = {};
    this.user = null;
    this.addable = false;
    this.creator = false;
    this.loading = false;
  }

  willUpdate (props) {
    if (props.has('src')) this.refresh();
  }

  refresh () {
    console.warn(`Refreshing…`);
    this.loading = true;
    fetch(this.src, { headers: { Accept: 'application/json' }})
      .then((r) => r.json())
      .then((feed) => {
        this.loading = false;
        this.data = feed;
      })
    ;
  }

  async intendToAddFeed () {
    const intentID = await window.envoyager.intent('create', 'envoyager/feed', { parent: this.src, position: 'prepend', creator: this.user });
    window.intentListener.once('success', intentID, () => this.refresh());
  }

  render () {
    if (this.loading) return html`<div><nv-loading></nv-loading></div>`;
    return html`<div>
      ${
        this.data?.name
        ? html`<h2>${this.data.name}</h2>`
        : nothing
      }
      ${
        this.creator && this.data?.creator
        ? html`<div id="creator"><img src=${`${this.data.creator}/avatar/src`} width="24" height="24" alt="Feed creator"></div>`
        : nothing
      }
      ${
        this.data?.items?.length
        ? this.data.items.map(it => html`<nv-item-card src=${it}></nv-item-card>`)
        : nothing
      }
      ${
        this.addable
        ? html`<div id="actions"><button @click=${this.intendToAddFeed}><span class="icon">+</span>Add Feed</button></div>`
        : nothing
      }
    </div>`;
  }
}
customElements.define('nv-feed-list', EnvoyagerFeedList);
