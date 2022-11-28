
import { LitElement, css, html } from '../../../deps/lit.js';

// XXX
//  - add support for clicking to trigger picker instead

// some credit due to https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
class EnvoyageImageDrop extends LitElement {
  // the idea is that the context can override this
  static styles = css`
    :host {
      display: block;
      background: #fff;
      border: 3px dashed rgba(0, 0, 0, 0.1);
    }
    #drop {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    svg {
      height: 50%;
      max-height: 142px;
      min-height: 18px;
      opacity: 0.2;
      stroke: #000;
    }
    .highlight svg {
      opacity: 1;
    }
  `;

  constructor () {
    super();
  }

  firstUpdated () {
    const dropArea = this.renderRoot.getElementById('drop');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtn => {
      dropArea.addEventListener(
        evtn,
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        false
      );
    });
    ['dragenter', 'dragover'].forEach(evtn => {
      dropArea.addEventListener(evtn, () => dropArea.classList.add('highlight'), false)
    });
    ['dragleave', 'drop'].forEach(evtn => {
      dropArea.addEventListener(evtn, () => dropArea.classList.remove('highlight'), false)
    });
    dropArea.addEventListener(
      'drop',
      (ev) => {
        // here we could add support for multiple
        const files = ev.dataTransfer.files;
        dropArea.style.backgroundImage = `url(${URL.createObjectURL(files[0])})`;
        const cev = new CustomEvent('image-dropped', {
          bubbles: true,
          composed: true,
          detail: { imageFile: files[0] },
        });
        this.dispatchEvent(cev);
      },
      false
    );
  }

  render () {
    return html`<div id="drop">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <line x1="15" y1="8" x2="15.01" y2="8"></line>
        <rect x="4" y="4" width="16" height="16" rx="3"></rect>
        <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
        <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
      </svg>
    </div>`;
  }
}
customElements.define('nv-image-drop', EnvoyageImageDrop);
