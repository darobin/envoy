
import { LitElement, css, html } from '../../../deps/lit.js';

class EnvoyCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    src: {
      type: URL,
      converter: {
        fromAttribute: (value) => new URL(value),
        toAttribute: (value) => value.toString(),
      },
    },
  };

  constructor () {
    super();
    this._cardID = null;
    this._ro = new ResizeObserver((entries) => {
      if (!this._cardID) return;
      const { blockSize: w, inlineSize: h } = entries[entries.length - 1].contentBoxSize[0];
      window.envoyCard.resize(this._cardID, w, h);
    });
  }

  async connectedCallback () {
    super.connectedCallback();
    this._cardID = await window.envoyCard.create();
    this._ro.observe(this);
  }

  async disconnectedCallback () {
    super.disconnectedCallback();
    this._ro.unobserve(this);
    await window.envoyCard.destroy(this._cardID);
    this._cardID = null;
  }

  async firstUpdated () {
    // set up move and resize here, including setting initial size
    const { x, y, width, height } = this.getBoundingClientRect();
    await window.envoyCard.resize(this._cardID, width, height);
    await window.envoyCard.move(this._cardID, x, y);
  }

  async updated (changed) {
    if (changed.has('src')) {
      await window.envoyCard.load(this._cardID, this.src);
    }
  }

  render () {
    return html`<div></div>`;
  }
}
customElements.define('envoy-card', EnvoyCard);
