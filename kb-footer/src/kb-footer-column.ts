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
            .then(() => column === 1 ? this.getAppFooterColumn(language) : '')
            .catch((error) => {
                console.error(error);
                let defaultsColumns = language === 'en' ? defaultsColumnsEN : defaultsColumnsDA;
                this.setValue(this.getHtml(defaultsColumns.data.attributes[`footer_column_${column}`], column, language));
                column === 1 ? this.getAppFooterColumn(language) : '';
            });
    };

    getAppFooterColumn = (language: string) : void => {
        let ul = this.getAppColumn(language);
        if (ul){
            let clonedUl = ul.cloneNode(true);
            this.addColumnToFooter(clonedUl);
        }
    }

    private addColumnToFooter(clonedUl: Node) {
        let shadowRoot = document.querySelector('kb-footer')?.shadowRoot;
        shadowRoot?.querySelector('.col-sm-6.col-lg-3 ul')?.remove();
        shadowRoot?.querySelector('.col-sm-6.col-lg-3')?.append(clonedUl);
    }

    private getAppColumn(language: string) {
        let columnId = language === 'en' ? 'appFooterColumnEN' : 'appFooterColumnDA';
        let ul = document.querySelector(`#${CSS.escape(columnId)}`);
        return ul ? ul : document.querySelector('#appFooterColumn');
    }

    getAppFooterColumn2 = (language: string) : void => {
        let uls = document.querySelectorAll(`ul`);
        let shadowRoot = document.querySelector('kb-footer')?.shadowRoot;
        if (uls.length){
            console.log('uls:', uls);
            shadowRoot?.querySelector('.col-sm-6.col-lg-3 ul')?.remove();
        }

        uls.forEach((ul, index)=> {
            if (language === 'en' && ul.id === 'appFooterColumn'){
               console.log(ul);
            }
            shadowRoot?.querySelector('.col-sm-6.col-lg-3')?.append(ul);
        })
        // uls = uls ? uls : document.querySelector('#appFooterColumn');
        // console.log(document, document.querySelector('#appFooterColumn'));
        // if (uls.length){
        //     let shadowRoot = document.querySelector('kb-footer')?.shadowRoot;
        //     shadowRoot?.querySelector('.col-sm-6.col-lg-3 ul')?.remove();
        //     uls.map(shadowRoot?.querySelector('.col-sm-6.col-lg-3')?.append(uls[i]))
        // }
    }

    ariaLabels = ['header-1727917245', 'header-570114362', 'header-1331148665'];
    // TODO: KBs API return relative Drupal / kb.dk uris, which is getting fixed here.
    //  Remove the fix when it is fixed in Drupal.
    getColumnHtml = (listData, column) => html`
        <div class="col-sm-6 col-lg-3" aria-labelledby="${this.ariaLabels[column]}">
            <h2 class="h3" id="${this.ariaLabels[column]}">${listData[0]?.title}</h2>
            <ul>
                ${listData.slice(1).map(itemData => html`
                    <li><a href="${this.fixLink(itemData.uri)}">${itemData.title.includes(":cookie:") ? itemData.title.substring(8) : itemData.title}</a></li>`)}
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

    private fixLink(uri) {
        uri = uri.startsWith("entity:node") ? "https://www.kb.dk/" + uri.substring(7) : uri;
        uri = uri.startsWith("internal:") ? "https://www.kb.dk" + uri.substring(9) : uri;
        uri = uri.match("route:<nolink>") ? "javascript:void();" : uri;
        return uri;
    }
}

export const kbFooterColumn = directive(KbFooterColumn);