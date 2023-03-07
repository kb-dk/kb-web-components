import {css} from "lit";
import {BSColLG3, BSColSM6, BSContainer, BSH3, BSRow} from "@kb-dk/kb-style/kb-bootstrap.js"
import {KBColors} from "@kb-dk/kb-style/kb-base.js"

export {BSColLG3, BSColSM6, BSContainer, BSH3, BSRow};
export {KBColors};
export const KBStyle = css`
  ${BSContainer}
  ${BSRow}
  ${BSColSM6}
  ${BSColLG3}
  ${BSH3}
  ${KBColors}
`;