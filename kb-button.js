import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class KbButton extends LitElement {

  static styles = css`
    button{
      height: 100%;
      display: inline-flex;
      align-items: center;
      background: #fff;
      border-radius: 0;
      color: #002e70;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0;
      padding: 0 22px;
      width: auto;
      border: none;
    }
    `;
  static properties = {
    type: {attribute: 'type'},
    text: {attribute: 'text'},
  };

  constructor() {
    super();
    this.type = {};
    this.text = {};
    this.addEventListener('click', (e) => this._submitForm(e));
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <button type="${this.type}" >
        <span class="material-symbols-outlined">search</span>
        <span >${this.text}</span>
      </button>
    `;
  }
  _submitForm(evt) {
    evt.stopPropagation();
    // this.closest('FORM').dispatchEvent(new Event('submit'));
    let submit = document.createElement('button');
    submit.setAttribute("type", "submit");
    submit.setAttribute("style", "display:none")
    evt.target.closest('FORM').appendChild(submit);
    // submit.click();
    console.dir(evt.target.closest('FORM'));
    const data = new FormData(evt.target.closest('FORM'));
    for (const [name,value] of data) {
      console.log(name, ":", value)
    }
  }
}

customElements.define('kb-button', KbButton);
