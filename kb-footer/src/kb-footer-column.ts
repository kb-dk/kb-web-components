import {directive} from "lit-html/directive.js";
import {html, TemplateResult} from "lit";
import {AsyncDirective} from "lit-html/async-directive.js";
import type {Part, DirectiveParameters} from 'lit/directive.js';
import "@kb-dk/kb-icon";
import {defaultsColumnsDA, defaultsColumnsEN, lastColumnDA, lastColumnEN} from './default_column_data.js';

class KbFooterColumn extends AsyncDirective {

    update = (part:Part, [column]: DirectiveParameters<this>): void => {
        let footerColumnDataUrl: string = `/jsonapi/node/site/e065d5e7-a348-4384-9859-c17841d03019?fields[node--site]=footer_column_${column}`;
        this.fetchData(footerColumnDataUrl, column);
    };

    fetchData = (url: string, column: number, language: string): void => {
        fetch(url)
            .then(response => response.json())
            .then(responseJson => responseJson.data.attributes[`footer_column_${column}`])
            .then(data =>  this.setValue(this.getHtml(data, column, language)))
            .then(() => column === 1 ? this.getAppFooterColumn() : '')
            .catch((error) => {
                console.error(error);
                let defaultsColumns = language === 'en' ? defaultsColumnsEN : defaultsColumnsDA;
                this.setValue(this.getHtml(defaultsColumns.data.attributes[`footer_column_${column}`], column, language));
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

    getHtml = (data, column: number, language: string) => {
        if (column === 4){
            // TODO: for now the last column is hard coded.
            //  It needs to be change in Drupal / kb.dk so it doesn't return the whole html, but the items.
            return language === 'en' ? lastColumnEN : lastColumnDA;
        }
        return this.getColumnHtml(data, column);
    }

    render = (column: number, language: string): TemplateResult => {
        let defaultsColumns = language === 'en' ? defaultsColumnsEN : defaultsColumnsDA;
        return this.getHtml(defaultsColumns, column, language);
    }

    private getUri(uri) {
        uri = uri.startsWith("entity:node") ? "https://www.kb.dk/" + uri.substring(7) : uri;
        uri = uri.startsWith("internal:") ? "https://www.kb.dk" + uri.substring(9) : uri;
        uri = uri.match("route:<nolink>") ? "javascript:void();" : uri;
        return uri;
    }
}

export const kbFooterColumn = directive(KbFooterColumn);