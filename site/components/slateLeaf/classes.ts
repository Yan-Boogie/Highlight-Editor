import { css } from '@emotion/css';

export const classes = {
  selected: css`
    position: inline-block;
    white-space: nowrap;

    background-color: rgba(255, 139, 224, 0.34);
    cursor: pointer;
  `,
  hiddenSpan: css`
    visibility: hidden;
    display: inline-block;
  `,
};
