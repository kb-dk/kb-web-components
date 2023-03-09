import { css } from "lit";
import {customElement, property} from "@lit/reactive-element/decorators";
import {html, LitElement} from "lit/development";
export const styles = css`
`;

@customElement('kb-template')
export class KbTemplate extends LitElement {
    @property() name = '';

    render() {
        return html``;
    }
}