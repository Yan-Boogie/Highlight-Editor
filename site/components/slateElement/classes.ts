import { css } from '@emotion/css';

const baseText = `
  color: #404040;
  margin: 0 0 8px 0;
  font-weight: 500;
` as const;

const paragraph = css`
  ${baseText}
  font-size: 18px;
  line-height: 20px;
  white-space: pre-line;
  margin: 0 0 1rem 0;
  font-weight: 400;
`;

export const classes = {
  divider: css`
    background-color: '#EAEAEA';
    border: 'none';
    margin: '12px 0',
    flex-shrink: 0;
    height: 1;
    width: 100%;
  `,
  h1: css`
    ${baseText}
    font-size: 40px;
    font-weight: 600;
    line-height: 40px;
    margin-bottom: 20;
  `,
  h2: css`
    ${baseText}
    font-size: 37px;
    line-height: 37px;
  `,
  h3: css`
    ${baseText}
    font-size: 34px;
    line-height: 34px;
  `,
  h4: css`
    ${baseText}
    font-size: 31px;
    line-height: 31px;
  `,
  h5: css`
    ${baseText}
    font-size: 28px;
    line-height: 28px;
  `,
  h6: css`
    ${baseText}
    font-size: 26px;
    line-height: 26px;
  `,
  metaData: css`
    font-size: 18px;
    color: #5c5c5c;
    margin: 0;
  `,
  body: css`
    ${paragraph}
  `,
};
