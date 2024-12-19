import {directive} from "lit-html/directive.js";
import {html, TemplateResult} from "lit";
import {AsyncDirective} from "lit-html/async-directive.js";
import type {Part, DirectiveParameters} from 'lit/directive.js';
import * as defaultFooter from './default_column_data.js';
import "@kb-dk/kb-icon";


class KbFooterColumns extends AsyncDirective {

    defaultsColumns = defaultFooter.columnsDA;
    lang = 'da';
    jsonUuId = '';
    update = (part:Part, [language, jsonUuId]: DirectiveParameters<this>): void => {
        this.lang = language;
        this.jsonUuId = jsonUuId
        const KBFooterUrl: string = `${process.env.BASEURL}${language === 'en' ? "/en" : ""}${process.env.JSONAPIURL}${this.jsonUuId}`;
        this.defaultsColumns = language === 'en' ? defaultFooter.columnsEN : defaultFooter.columnsDA;
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

    getLastColumnHtml (data): TemplateResult {
        let lastCol: TemplateResult = html``;
        let logo: TemplateResult = html``;
        if (data.data.attributes[`footer_column_5`]) {
            if (data.data.attributes[`footer_column_5`][0].title.includes("logo")) {
                logo = html`
                    <div class="rdl-logo rdl-logo-inverted"></div>`;
            }
            data.data.attributes[`footer_column_5`].forEach((element) => {
                if (!element.title.includes("logo")) {
                    if (element.full_url == '') {
                        lastCol = html`${lastCol}
                        <li role="none">${element.title}</li>`;
                    } else {
                        lastCol = html`${lastCol}
                        <li role="none"><a role="menuitem" href="${(element.full_url)}">${element.title}</a></li>`;
                    }
                }
            });
            lastCol = html`${logo}
            <ul role="menubar" aria-label="${data.data.attributes[`footer_column_5`][0].title}">${lastCol}</ul> `;
            let soMeCol: TemplateResult = html``;
            if (data.data.attributes[`footer_column_6`]) {
                data.data.attributes[`footer_column_6`].forEach((element) => {
                    if (element.icon) {
                        soMeCol = html`${soMeCol}
                        <a href=${element.uri}>
                            <kb-icon name="${element.icon}" aria-hidden="true"></kb-icon>
                            <span class="sr-only">${element.title}</span>
                        </a>`
                    }
                });
                soMeCol = html`
                    <div class="some-icons">
                        ${soMeCol}
                    </div>`;
            }
            lastCol = html`
                <div class="col-sm-6 col-lg-3">
                    ${lastCol} ${soMeCol}
                </div>`
        }
       return lastCol;
    }
    // TODO: There are problems with '/was' and 'cookie' urls, which get fixed here.
    //  Remove the fix when it is fixed in kb.dk jsonapi.
    getColumnHtml = (listData, column):TemplateResult => html`
        <div class="col-sm-6 col-lg-3">
            <h2 class="h3" id="${defaultFooter.headerAriaLabels[column]}">${listData[0]?.title}</h2>
            <ul role="menubar" aria-label="${listData[0]?.title}">
                ${listData.slice(1).map(itemData => {
                    let item = html``;
                    if (itemData.title.includes(":cookie:")){
                        item = html`
                        <li role="none"><a @click="${this.handleClick}" role="menuitem" href="javascript:void(0)" id="csconsentlink">${this.fixCookie(itemData)}</a></li>
                        `;
                    } else {
                        item = html`
                        <li role="none"><a role="menuitem" href="${itemData.full_url}">${itemData.title}</a></li>
                        `;
                    }
                    return item;
                    }
                )}
            </ul>
        </div>
    `;

    handleClick = () => {
        let cookie = document.getElementById('csconsentlink');
        if (cookie){
            cookie.click();
        }
    }
    getHtml = (data) => {
        let footerHtml: TemplateResult = html``;
        for (let column = 1; column <= 3; column++){
            footerHtml = html`${footerHtml} ${this.getColumnHtml(data.data.attributes[`footer_column_${column}`], column)}`;
        }
        footerHtml = html`${footerHtml} ${this.getLastColumnHtml(data)}`
        return html`${footerHtml}`;
    }

    render = (language: string, jsonUuId: string): TemplateResult => {
        this.defaultsColumns = language === 'en' ? defaultFooter.columnsEN : defaultFooter.columnsDA;
        // I don't understand why lang and lastColumn won't update when language changes,
        // but the first line (above) get updated.
        // To fix this I added the same lines to the update method as well.
        this.lang = language;
        this.jsonUuId = jsonUuId;
        return this.getHtml(this.defaultsColumns);
    }


    private fixCookie(itemData) {
        return itemData.title.substring(8);
    }

}

export const kbFooterColumns = directive(KbFooterColumns);