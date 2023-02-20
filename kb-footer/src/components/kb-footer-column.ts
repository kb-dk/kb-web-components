import {directive} from "lit-html/directive.js";
import {html, TemplateResult} from "lit";
import {AsyncDirective} from "lit-html/async-directive.js";
import type {Part, DirectiveParameters} from 'lit/directive.js';

class KbFooterColumn extends AsyncDirective {

    update = (part:Part, [column]: DirectiveParameters<this>): void => {
        let footerColumnDataUrl: string = `/jsonapi/node/site/e065d5e7-a348-4384-9859-c17841d03019?fields[node--site]=footer_column_${column}`;
        return this.fetchData(footerColumnDataUrl, column);
    };

    fetchData = (url: string, column: number): void => {
        fetch(url)
            .then(response => response.json())
            .then(responseJson => responseJson.data.attributes[`footer_column_${column}`])
            .then(data =>  this.setValue(this.getColumnHtml(data)))
            .catch((error) => {
                this.setValue(this.getColumnHtml([]));
            });
    };

    getColumnHtml = listData => html`
            <div>
                <h2>${listData[0]?.title}</h2>
                <ul>
                    ${listData.slice(1).map(itemData => html`
                        <li><a href="${itemData.uri}">${itemData.title}</a></li>`)}
                </ul>
            </div>
    `;

    render = (column: number): TemplateResult => this.getColumnHtml([]);
}

export const kbFooterColumn = directive(KbFooterColumn);