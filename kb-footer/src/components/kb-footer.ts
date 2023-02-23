import {LitElement, css, html} from "lit";
import {kbFooterColumn} from "./kb-footer-column";
import {customElement} from "lit/decorators.js";
import "@test_kbdk/kb-fonts/css/style.css";
import "../img/logo-white.svg";

@customElement('kb-footer')
export class KbFooter extends LitElement {

    static styles =
        css`
          :host {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
          }

          footer {
            font-family: noway, sans-serif;
            font-weight: 400;
            padding: 36px 48px 40px;
            display: flex;
            background: #002e70;
            color: #fff;
            flex-direction: column;
          }

          @media (min-width: 990px) {
            footer {
              flex-direction: row;
            }
          }

          footer div {
            flex: 0 0 100%;
            max-width: 100%;
            padding-bottom: 12px;
          }

          @media (min-width: 990px) {
            footer div {
              flex: 0 0 25%;
              max-width: 25%;
            }
          }

          footer div ul {
            list-style-type: none;
            padding-inline-start: 0;
            margin-bottom: 1rem;
          }
          
          footer h2{
            font-weight: 700;
            line-height: 1.5rem;
            margin-bottom: 12px;
            margin-top: 0;
          }

          footer a {
            text-decoration: none;
            color: white;
          }

          .rdl-icons{
            speak: none;
            word-wrap: normal;
            -ms-font-feature-settings: "liga" 1;
            font-feature-settings: "liga";
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            -moz-osx-font-smoothing: grayscale;
            direction: ltr;
            display: inline-block;
            font-family: rdl-icons,serif;
            font-size: 20px;
            font-style: normal;
            font-variant-ligatures: discretionary-ligatures;
            font-weight: 400;
            letter-spacing: normal;
            line-height: 1;
            text-transform: none;
            white-space: nowrap;
          }

          .some-icons {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 16px;
          }
          
          .some-icons a {
            background-color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin-right: 12px;
          }

          footer.global-footer .some-icons a {
            align-items: center;
            background-color: #fff;
            border-radius: 50%;
            display: inline-flex;
            height: 24px;
            justify-content: center;
            margin-right: 12px;
            width: 24px;
          }

          .some-icons a:last-child {
            margin-right: 0;
          }
          
          .some-icons a i {
            font-size: 0.875rem;
            color: #002e70;
          }

          .some-icons a:hover, .some-icons a:focus {
            text-decoration: none;
          }

          @media (min-width: 640px) {
            footer.global-footer .some-icons {
              left: inherit;
              position: inherit;
              transform: none;
            }
          }

          footer.global-footer li, footer.global-footer p {
            margin-bottom: 12px;
          }

          footer.global-footer .rdl-logo {
            height: 48px;
            margin-bottom: 16px;
          }
          
          .rdl-logo {
            background-image: url(../img/logo-digital-white.svg);
            background-position: 0;
            background-repeat: no-repeat;
            background-size: contain;
            display: inline-block;
            height: 32px;
            width: 138px;
            max-width: initial;
            padding-bottom: 0;
          }
          
          @media (min-width: 990px) {
            .rdl-logo.rdl-logo-inverted {
              background-image: url(../img/logo-white.svg);
              width: 174px;
            }
          }

          .sr-only {
            clip: rect(0,0,0,0);
            border: 0;
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            white-space: nowrap;
            width: 1px;
          }
        `;

    lastColumn = html`
        <div>
            <div id="header-814861072" class="rdl-logo rdl-logo-inverted"><span class="sr-only">Kontaktinformationer</span></div>
            <ul>
                <li><a href="/spoerg-biblioteket">Spørg biblioteket</a></li>
                <li><a href="/om-os/kontakt">kb@kb.dk</a></li>
                <li aria-label="telefonnummer">
                    Tel: (+45) 3347 4747
                </li>
                <li><a href="/om-os/presse">Pressekontakt</a></li>
                <li aria-label="EAN nummer">
                    EAN: 5798000795297
                </li>
                <li class="some-icons">
                    <a href="https://www.facebook.com/DetKglBibliotek/"><i class="rdl-icons">rdl_facebook</i><span
                            class="sr-only">Følg os på facebook</span></a>
                    <a href="https://www.instagram.com/detkglbibliotek/"><i class="rdl-icons">rdl_instagram</i><span
                            class="sr-only">Følg os på Instagram</span></a>
                    <a href="https://www.linkedin.com/company/det-kgl-bibliotek/"><i
                            class="rdl-icons">rdl_linkedin</i><span class="sr-only">Følg os på LinkedIn</span></a>
                    <a href="https://twitter.com/DetKglBibliotek"><i class="rdl-icons">rdl_twitter</i><span
                            class="sr-only">Følg os på twitter</span></a>
                </li>
            </ul>
        </div>
    `;

    render() {
        return html`
            <footer class="global-footer">
                ${[1, 2, 3].map(i => html`${kbFooterColumn(i)}`)}
                ${this.lastColumn}
            </footer>
        `;
    }
}