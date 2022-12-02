
import { LitElement, html, css } from '../../../deps/lit.js';
import { buttonStyles } from '../../button-styles.js';
import { formStyles } from '../../form-styles.js';

class EnvoyagerIntentListModal extends LitElement {
  static properties = {
    active: { type: Boolean, reflect: true },
    handlerName: { attribute: false },
    handlerURL: { attribute: false },
    intents: { attribute: false },
    action: { attribute: false },
    type: { attribute: false },
    data: { attribute: false },
    intentID: { attribute: false },
  };
  static styles = [css`
    :host {
      display: none;
    }
    :host([active]) {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 9999;
      background: #0006;
      justify-content: center;
      align-items: center;
    }
    nv-box {
      background: #fff;
      min-width: 30rem;
    }
    .intent-action {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 1rem 0;
      border-top: 1px solid #000;
      transition: all 0.15s ease-in 0s;
    }
    .intent-action:hover {
      background: var(--highlight);
      color: #fff;
    }
    .intent-action:first-of-type {
      border: none;
    }
    .icon {
      width: 50px;
      height: 50px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 40px;
      margin-left: 1rem;
    }
    .label {
      font-size: 1.2rem;
      font-family: var(--heading-font);
      padding-left: 1rem;
    }
  `, formStyles, buttonStyles];

  constructor () {
    super();
    this.resetState();
    window.envoyager.onIntentList((ev, intents, action, type, data, id) => {
      console.warn(`onIntentList`, intents, action, type, data, id);
      this.intents = intents;
      this.action = action;
      this.type = type;
      this.data = data;
      this.intentID = id;
      this.active = true;
    });
  }

  resetState () {
    this.active = false;
    this.intents = [];
    this.action = null;
    this.type = null;
    this.data = {};
    this.handlerName = 'Action';
    this.handlerURL = null;
  }

  selectHandler (ev) {
    const { name, url } = ev.target.dataset;
    this.handlerName = name;
    this.handlerURL = url;
  }

  onComplete () {
    window.intentListener.success(this.intentID);
  }
  onCancel () {
    window.intentListener.failure(this.intentID);
  }
  close () {
    this.onCancel();
    this.resetState();
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
        <div class="form-action"><button type="reset" @click=${this.close}>Cancel</button></div>
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

// singleton
window.intentListener = new class IntentListener {
  constructor () {
    this.successHandlers = {};
    this.failureHandlers = {};
    this.completeHandlers = {};
  }
  once (type, id, cb) {
    const handlers = this[`${type}Handlers`];
    handlers[id] = cb;
  }
  runOnce (type, id) {
    const handlers = this[`${type}Handlers`];
    if (handlers[id]) {
      handlers[id]();
      delete handlers[id];
    }
  }
  success (id) {
    this.runOnce('success', id);
    this.runOnce('complete', id);
  }
  failure (id) {
    this.runOnce('failure', id);
    this.runOnce('complete', id);
  }
};
