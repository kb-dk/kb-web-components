import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class KBStack extends LitElement {

  static styles = css`
    div{
      display: flex;
    }
    :host([shadow]) div{
      border: 1px solid #f5f5f5;
      border-radius: 2px;
      box-shadow: 0 2px 2px rgb(0 0 0 / 24%);
      flex-wrap: nowrap;
    }
    `;

  static properties = {
    shadow: {type: Boolean, reflect: true},
  };

  constructor() {
    super();
  }

  render() {
    return html`
        <div>
          <slot></slot>
        </div>
    `;
  }
}

customElements.define('kb-stack', KBStack);
