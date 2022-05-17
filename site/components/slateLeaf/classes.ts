import { css } from '@emotion/css';

export const classes = {
  selected: css`
    position: absolute;
    white-space: nowrap;
    top: 0;
    left: 0;
    background-color: rgba(255, 139, 224, 0.34);
    cursor: pointer;
  `,
  hiddenSpan: css`
    visibility: hidden;
    display: inline-block;
  `,
};
