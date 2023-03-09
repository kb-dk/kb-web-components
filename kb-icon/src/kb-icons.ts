import {LitElement, html, css} from "lit";
import {customElement, property} from "lit/decorators.js";
import {icons} from "./icon-list";

@customElement('kb-icon')
export class KbIcon extends LitElement {

    static styles = css
            `
    :host {
    peak: none;
    overflow-wrap: normal;
    font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizelegibility;
    direction: ltr;
    display: inline-block;
    font-size: 18px;
    font-style: normal;
    font-variant-ligatures: discretionary-ligatures;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 1;
    text-transform: none;
    white-space: nowrap;
}
`;

    @property() name = '';
    @property() color = '#002e70';
    @property() size = 'xxs';

    render() {
        if (this.name.length) {
            return this.getIcon();
        }
        return html``;
    }

    private getIcon() {
        const dom = new DOMParser().parseFromString(icons[this.name].default, 'text/html');
        const icon = dom.querySelector('svg');
        return html`
            <style>
                :host {
                    color: ${this.color};
                }

                svg {
                    width: ${this.getSize()};
                    height: ${this.getSize()};
                }
            </style>
            ${icon}
        `;
    }

    private getSize = (): string => {
        switch (this.size) {
            case 'xxs':
                return "14px";
            case 'xs':
                return "18px";
            case 's':
                return "24px";
            case 'm':
                return "36px";
            case 'l':
                return "48px";
            case 'xl':
                return "60px";
            case 'xxl':
                return "72px";
            default:
                return "14px";
        }
    }
}