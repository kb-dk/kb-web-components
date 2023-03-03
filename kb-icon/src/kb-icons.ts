import {LitElement, html} from "lit";
import {customElement, property} from "lit/decorators.js";
import {icons} from "./icon-list";

@customElement('kb-icon')
export class KbIcon extends LitElement {

    @property() name = '';
    @property() color = '#002e70';
    @property() size = 'xs';

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
                return "18px";
        }
    }
}