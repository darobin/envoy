
import { css } from '../../../deps/lit.js';

export const buttonStyles = css`
button {
  position: relative;
  margin: 0;
  padding: 0;
  min-width: 150px;
  height: 2.5em;
  line-height: 2.375em;
  font-family: var(--heading-font);
  font-size: 1em;
  font-weight: 200;
  font-variation-settings: "wght" 200;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  border-radius: 0;
  user-select: none;
  background-image: none;
  transition: all 0.15s ease-in 0s;
  background: #000;
  color: #fff;
}
button:hover, button:focus {
  color: var(--highlight);
}
button:active {
  background: var(--highlight);
  color: #000;
}
`;
