import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {kbFooterColumn} from "./kb-footer-column.js";

export class KbFooter extends LitElement {

  static styles = css`
    :host{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
    
    footer{
      padding: 36px 48px 40px;
      display: flex;
      background: #002e70;
      color: #fff;
    }
    
    footer div{
      flex: 0 0 25%;
      max-width: 25%;
      padding-bottom: 12px;
    }

    footer div ul {
      list-style-type: none;
      padding-inline-start: 0;
      margin-bottom: 1rem;
    }
    
    footer a{
      text-decoration: none;
      color: white;
    }
    `;
  static properties = {
    type: {attribute: 'type'},
    text: {attribute: 'text'},
    data: {attribute: false},
  };

  constructor() {
    super();
    this.type = {};
    this.text = {};
    this.data = {};
  }

  lastColumn = html`
    <div>
      <ul>
      <li><a href="/spoerg-biblioteket">Spørg biblioteket</a></li>
      <li><a href="/om-os/kontakt">kb@kb.dk</a></li>
      <li aria-label="telefonnummer">
        Tel: (+45) 3347 4747</li>
      <li><a href="/om-os/presse">Pressekontakt</a></li>
      <li aria-label="EAN nummer">
        EAN: 5798000795297
      </li>
<!--      <li class="some-icons">-->
<!--        <a href="https://www.facebook.com/DetKglBibliotek/"><i class="rdl-icons">rdl_facebook</i><span class="sr-only">Følg os på facebook</span></a>-->
<!--        <a href="https://www.instagram.com/detkglbibliotek/"><i class="rdl-icons">rdl_instagram</i><span class="sr-only">Følg os på Instagram</span></a>-->
<!--        <a href="https://www.linkedin.com/company/det-kgl-bibliotek/"><i class="rdl-icons">rdl_linkedin</i><span class="sr-only">Følg os på LinkedIn</span></a>-->
<!--        <a href="https://twitter.com/DetKglBibliotek"><i class="rdl-icons">rdl_twitter</i><span class="sr-only">Følg os på twitter</span></a>-->
<!--      </li>-->
      </ul>
    </div>
  `;
  render() {
    return html`
        <footer>
            ${[1, 2, 3].map(i => html`${kbFooterColumn(i)}`)}
            ${this.lastColumn}
        </footer>
    `;
  }
}

customElements.define('kb-footer', KbFooter);
