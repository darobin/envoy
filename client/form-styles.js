
import { css } from '../deps/lit.js';

export const formStyles = css`
.form-line {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 1rem;
}
.form-action {
  text-align: right;
  padding: 1px;
  margin-top: 2rem;
}
label {
  font-family: var(--heading-font);
  font-variation-settings: "wght" 400;
}
input {
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transition: all 0.5s;
}
input:focus {
  border-color: var(--highlight);
}
input:not(:blank):invalid {
  border-color: var(--error);
}
.form-line > label {
  flex-basis: 150px;
}
.form-line > input {
  flex-grow: 1;
}
.error-message {
  color: var(--error);
  margin-top: 1rem;
  margin-left: var(--left-pad);
}
`;
