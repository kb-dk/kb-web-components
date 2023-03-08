import {directive} from "lit-html/directive.js";
import {html, TemplateResult} from "lit";
import {AsyncDirective} from "lit-html/async-directive.js";
import type {Part, DirectiveParameters} from 'lit/directive.js';
import "@kb-dk/kb-icon/index.js";
import {defaultsColumns} from './default_column_data.js';

class KbFooterColumn extends AsyncDirective {

    update = (part:Part, [column]: DirectiveParameters<this>): void => {
        let footerColumnDataUrl: string = `/jsonapi/node/site/e065d5e7-a348-4384-9859-c17841d03019?fields[node--site]=footer_column_${column}`;
        this.fetchData(footerColumnDataUrl, column);
    };

    fetchData = (url: string, column: number): void => {
        fetch(url)
            .then(response => response.json())
            .then(responseJson => responseJson.data.attributes[`footer_column_${column}`])
            .then(data =>  this.setValue(this.getHtml(data, column)))
            .then(() => column === 1 ? this.getAppFooterColumn() : '')
            .catch((error) => {
                this.setValue(this.getHtml(defaultsColumns.data.attributes[`footer_column_${column}`], column));
                column === 1 ? this.getAppFooterColumn() : '';
            });
    };

    getAppFooterColumn = () : void => {
        let ul = document.querySelector('#appFooterColumn');
        if (ul){
            let shadowRoot = document.querySelector('kb-footer')?.shadowRoot;
            shadowRoot?.querySelector('.col-sm-6.col-lg-3 ul')?.remove();
            shadowRoot?.querySelector('.col-sm-6.col-lg-3')?.append(ul);
        }
    }
    lastColumnDA = html`
        <div class="col-sm-6 col-lg-3">
            <div class="rdl-logo rdl-logo-inverted">
                <span class="sr-only">Kontaktinformationer</span>
            </div>

            <div><p><a href="https://www.kb.dk/spoerg-biblioteket">Spørg biblioteket</a></p></div>
            <div>
                <p><a href="https://www.kb.dk/om-os/kontakt">kb@kb.dk</a></p>
            </div>
            <div aria-label="telefonnummer">
                <p>Tel: <a href="tel:+4533474747">(+45) 3347 4747</a></p>
            </div>
            <div><p><a href="https://www.kb.dk/om-os/presse">Pressekontakt</a></p></div>
            <div aria-label="EAN nummer">
                <p>EAN: 5798000795297</p>
            </div>
            <div class="some-icons">
                <a href="https://www.instagram.com/detkglbibliotek/">
                    <kb-icon name="instagram" aria-hidden="true"></kb-icon>
                    <span class="sr-only">Følg os på Instagram</span>
                </a>
                <a href="https://www.facebook.com/DetKglBibliotek/">
                    <kb-icon name="facebook" aria-hidden="true"></kb-icon>
                    <span class="sr-only">Følg os på facebook</span>
                </a>
                <a href="https://www.linkedin.com/company/det-kgl-bibliotek/">
                    <kb-icon name="linkedin" aria-hidden="true"></kb-icon>
                    <span class="sr-only">Følg os på LinkedIn</span>
                </a>
                <a href="https://twitter.com/DetKglBibliotek">
                    <kb-icon name="twitter" aria-hidden="true"></kb-icon>
                    <span class="sr-only">Følg os på twitter</span>
                </a>
            </div>
        </div>
    `;

    ariaLabels = ['header-1727917245', 'header-570114362', 'header-1331148665'];
    // TODO: KBs API return relative Drupal / kb.dk uris, which is getting fixed here.
    //  Remove the fix when it is fixed in Drupal.
    getColumnHtml = (listData, column) => html`
        <div class="col-sm-6 col-lg-3" aria-labelledby="${this.ariaLabels[column]}">
            <h2 class="h3" id="${this.ariaLabels[column]}">${listData[0]?.title}</h2>
            <ul>
                ${listData.slice(1).map(itemData => html`
                    <li><a href="${this.getUri(itemData.uri)}">${itemData.title.includes(":cookie:") ? itemData.title.substring(8) : itemData.title}</a></li>`)}
            </ul>
        </div>
    `;

    getHtml = (data, column) => {
        if (column === 4){
            // TODO: for now the last column is hard coded.
            //  It needs to be change in Drupal / kb.dk so it doesn't return the whole html, but the items.
            return this.lastColumnDA;
        }
        return this.getColumnHtml(data, column);
    }

    render = (column: number): TemplateResult => this.getHtml(defaultsColumns, column);

    private getUri(uri) {
        uri = uri.startsWith("entity:node") ? "https://www.kb.dk/" + uri.substring(7) : uri;
        uri = uri.startsWith("internal:") ? "https://www.kb.dk" + uri.substring(9) : uri;
        uri = uri.match("route:<nolink>") ? "javascript:void();" : uri;
        return uri;
    }
}

export const kbFooterColumn = directive(KbFooterColumn);