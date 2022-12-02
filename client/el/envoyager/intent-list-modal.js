
import { LitElement, html, css } from '../../../deps/lit.js';

class EnvoyagerIntentListModal extends LitElement {
  static properties = {
    active: { type: Boolean, reflect: true },
    handlerName: { attribute: false },
    handlerURL: { attribute: false },
    intents: { attribute: false },
    action: { attribute: false },
    type: { attribute: false },
    data: { attribute: false },
  };
  static styles = css`
    :host {
      display: none;
    }
    :host[active] {
      display: flex;
      position: fixed;
      z-index: 9999;
      background: #0006;
      justify-content: center;
      align-items: center;
    }
  `;

  constructor () {
    super();
    this.active = false;
    this.intents = [];
    this.action = null;
    this.type = null;
    this.data = {};
    this.handlerName = 'Action';
    this.handlerURL = null;
    window.envoyager.onIntentList((ev, intents, action, type, data) => {
      this.intents = intents;
      this.action = action;
      this.type = type;
      this.data = data;
      this.active = true;
    });
  }

  selectHandler (ev) {
    const { name, url } = ev.target.dataset;
    this.handlerName = name;
    this.handlerURL = url;
  }

  render () {
    if (!this.handlerURL) {
      return html`<nv-box title="Select Action">
        ${
          this.intents.length
          ? this.intents.map(nt => (html`<div class="intent-action" data-url=${nt.url} data-name=${nt.name} @click=${this.selectHandler}>
              <div class="icon" style=${nt.icon?.src ? `background-image: url(${nt.icon.src})` : ''}></div>
              <div class="label">${nt.name}</div>
            </div>`))
          : html`<p>No available action matches this intent.</p>`
        }
      </nv-box>`;
    }
    return html`<nv-box title=${this.handlerName}>
      <nv-intent-action
        src=${this.handlerURL}
        action=${this.action}
        type=${this.type}
        .data=${this.data}
        .onComplete=${this.onComplete}
        .onCancel=${this.onCancel}
        ></nv-intent-action>
    </nv-box>`;
  }
}
customElements.define('nv-intent-list-modal', EnvoyagerIntentListModal);
