import {directive} from "lit-html/directive.js";
import {html, TemplateResult} from "lit";
import {AsyncDirective} from "lit-html/async-directive.js";
import type {Part, DirectiveParameters} from 'lit/directive.js';
import "@kb-dk/kb-icon";
import {defaultsColumnsDA, defaultsColumnsEN, lastColumnDA, lastColumnEN} from './default_column_data.js';

class KbFooterColumns extends AsyncDirective {

    defaultsColumns = defaultsColumnsDA;
    lastColumn = lastColumnDA;
    lang = 'da';

    update = (part:Part, [language]: DirectiveParameters<this>): void => {
        this.lang = language;
        const KBFooterUrl: string = `/footer-api${language === 'en' ? "/en" : ""}/jsonapi/node/site/e065d5e7-a348-4384-9859-c17841d03019`;
        this.updateColumnsWithKBData(KBFooterUrl);
    };
    updateColumnsWithKBData = async (url: string) => {
            return fetch(url)
                .then(response => response.json())
                .then(data =>  this.setValue(this.getHtml(data)))
                .then(() => this.replaceFirstColumnWithAppColumnIfExist())
                .catch((error) => console.error(error)
                );
    };

    replaceFirstColumnWithAppColumnIfExist = () : void => {
        const ul = this.getAppColumn();
        if (ul){
            const clonedUl = ul.cloneNode(true);
            this.addColumnToFooter(clonedUl);
        }
    }

    private addColumnToFooter(clonedUl: Node) {
        const shadowRoot = document.querySelector('kb-footer')?.shadowRoot;
        shadowRoot?.querySelector('.col-sm-6.col-lg-3 ul')?.remove();
        shadowRoot?.querySelector('.col-sm-6.col-lg-3')?.append(clonedUl);
    }

    private getAppColumn() {
        const columnId = this.lang === 'en' ? 'appFooterColumnEN' : 'appFooterColumnDA';
        const ul = document.querySelector(`#${CSS.escape(columnId)}`);
        return ul ? ul : document.querySelector('#appFooterColumn');
    }

    ariaLabels = ['header-1727917245', 'header-570114362', 'header-1331148665'];
    // TODO: KBs API return relative Drupal / kb.dk uris, which is getting fixed here.
    //  Remove the fix when it is fixed in Drupal.
    getColumnHtml = (listData, column):TemplateResult => html`
        <div class="col-sm-6 col-lg-3" aria-labelledby="${this.ariaLabels[column]}">
            <h2 class="h3" id="${this.ariaLabels[column]}">${listData[0]?.title}</h2>
            <ul>
                ${listData.slice(1).map(itemData => html`
                    <li><a href="${this.fixLink(itemData.uri)}">${itemData.title.includes(":cookie:") ? itemData.title.substring(8) : itemData.title}</a></li>`)}
            </ul>
        </div>
    `;

    getHtml = (data) => {
        let footerHtml: TemplateResult = html``;
        for (let column = 1; column <= 3; column++){
            footerHtml = html`${footerHtml} ${this.getColumnHtml(data.data.attributes[`footer_column_${column}`], column)}`;
        }
        return html`${footerHtml} ${this.lastColumn}`;
    }

    render = (language: string): TemplateResult => {
        this.defaultsColumns = language === 'en' ? defaultsColumnsEN : defaultsColumnsDA;
        this.lastColumn = language === 'en' ? lastColumnEN : lastColumnDA;
        // I don't understand why lang won't update when language changes,
        // but the other two lines (above) get updated.
        // To fix this I added the same line to the update method as well.
        this.lang = language;
        return this.getHtml(this.defaultsColumns);
    }

    private fixLink(uri) {
        uri = uri.startsWith("entity:node") ? "https://www.kb.dk/" + uri.substring(7) : uri;
        uri = uri.startsWith("internal:") ? "https://www.kb.dk" + uri.substring(9) : uri;
        uri = uri.match("route:<nolink>") ? "javascript:void();" : uri;
        return uri;
    }
}

export const kbFooterColumns = directive(KbFooterColumns);