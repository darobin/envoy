
import { css } from '../deps/lit.js';

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
button[type="reset"] {
  border: 1px solid #000;
  background: #fff;
  color: #000;
}
button:hover, button:focus {
  color: var(--highlight);
}
button:active {
  background: var(--highlight);
  color: #000;
}
button span.icon {
  /* border-right: 1px solid #fff; */
  display: inline-block;
  padding-right: 0.5rem;
  font-weight: 400;
  font-variation-settings: "wght" 400;
  color: var(--highlight);
}
button.small {
  min-width: 0;
  height: auto;
  line-height: initial;
  margin-left: 0.5rem;
}
button.discreet {
  background: transparent;
  opacity: 0.5;
}
button.discreet:hover {
  opacity: 1;
}
`;
