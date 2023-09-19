import {directive} from "lit-html/directive.js";
import {html, TemplateResult} from "lit";
import {AsyncDirective} from "lit-html/async-directive.js";
import type {Part, DirectiveParameters} from 'lit/directive.js';
import * as defaultFooter from './default_column_data.js';
import "@kb-dk/kb-icon";


class KbFooterColumns extends AsyncDirective {

    defaultsColumns = defaultFooter.columnsDA;
    lastColumn = defaultFooter.lastColumnDA;
    lang = 'da';

    update = (part:Part, [language]: DirectiveParameters<this>): void => {
        this.lang = language;
        console.log(process.env.BASEURL)
       const KBFooterUrl: string = `${process.env.BASEURL}${language === 'en' ? "/en" : ""}${process.env.JSONAPIURL}`;
        this.getKBFooterData(KBFooterUrl)
            .then(footerJson =>  this.setValue(this.getHtml(footerJson)))
            .then(() => this.replaceFirstColumnWithAppColumnIfExist());
    };

    getKBFooterData = async (url: string): Promise<Object> => {
        return fetch(url)
            .then(response => response.json())
            .catch((error) => {
                    console.error(error);
                    return this.defaultsColumns;
                }
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

    // TODO: There are problems with '/was' and 'cookie' urls, which get fixed here.
    //  Remove the fix when it is fixed in kb.dk jsonapi.
    getColumnHtml = (listData, column):TemplateResult => html`
        <div class="col-sm-6 col-lg-3" aria-labelledby="${defaultFooter.headerAriaLabels[column]}">
            <h2 class="h3" id="${defaultFooter.headerAriaLabels[column]}">${listData[0]?.title}</h2>
            <ul>
                ${listData.slice(1).map(itemData => html`
                    <li><a href="${this.fixLink(itemData.full_url)}">${itemData.title.includes(":cookie:") ? itemData.title.substring(8) : itemData.title}</a></li>`)}
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
        this.defaultsColumns = language === 'en' ? defaultFooter.columnsEN : defaultFooter.columnsDA;
        this.lastColumn = language === 'en' ? defaultFooter.lastColumnEN : defaultFooter.lastColumnDA;
        // I don't understand why lang won't update when language changes,
        // but the other two lines (above) get updated.
        // To fix this I added the same line to the update method as well.
        this.lang = language;
        return this.getHtml(this.defaultsColumns);
    }

    private fixLink(uri) {
        uri = uri === "" ? "javascript:void(0);" : uri;
        uri = uri === "/was" ? "https://www.kb.dk/was" : uri;
        return uri;
    }
}

export const kbFooterColumns = directive(KbFooterColumns);