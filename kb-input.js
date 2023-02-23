import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class KBInput extends LitElement {
  static formAssociated = false;

  static properties = {
    type: {type: String, reflect: true},
    placeholder: {type: String, reflect: true},
    name: {type: String, reflect: true},
    expand: {type: Boolean, reflect: true},
  };

  constructor() {
    super();
    this.type = {};
    this.placeholder = {};
    this.name = {};
    this.expand = false;
    this.internals = this.attachInternals();
  }

  static get styles() {
    return [
      css`
        input {
          border: none;
          height: 72px;
          padding: 20px 12px;
          background-clip: padding-box;
          background-color: #fff;
          border-radius: 2px;
          color: #495057;
          display: block;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        }
        :host([expand]),
        :host([expand]) input{
          width: 100%;
        }
        
        :focus-visible {
          outline: 0;
        }
      `];
  }
  render() {
    return html`
      <div>
        <input type="${this.type}" name="${this.name}" placeholder="${this.placeholder}" @input="${this._onInput}">
      </div>
    `;
  }

  _onInput(event) {
    this.value = event.target.value;
    this.internals.setFormValue(this.value);
  }

  /** LitElement lifecycle method */
  // firstUpdated(...args) {
  //   super.firstUpdated(...args);
  //   /** This ensures our element always participates in the form */
  //   this.internals.setFormValue(this.value);
  // }

}

customElements.define('kb-input', KBInput);
