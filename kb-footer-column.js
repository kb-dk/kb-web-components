import {html, directive, AsyncDirective} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
class KbFooterColumn extends AsyncDirective {

    constructor() {
        super();
    }
    update(part, [column]){
        let footerColumnDataUrl = `https://kbdk-testing.kb.dk/jsonapi/node/site/e065d5e7-a348-4384-9859-c17841d03019?fields[node--site]=footer_column_${column}`;
        if (this.isConnected) {
            return this.fetchData(footerColumnDataUrl, column);
        }
        return '';
    }

    fetchData(url, column) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return this.setValue(this.render(data.data.attributes[`footer_column_${column}`]));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render(listData) {
        return html`
            <div>
                <h2>${listData[0].title}</h2>
                <ul>
                    ${listData.slice(1).map(itemData => html`
                        <li><a href="${itemData.uri}">${itemData.title}</a></li>`)}
                </ul>
            </div>
    `;
    }
}

export const kbFooterColumn = directive(KbFooterColumn);