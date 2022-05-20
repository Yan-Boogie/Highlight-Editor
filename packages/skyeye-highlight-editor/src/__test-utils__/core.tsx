import { queries } from '@testing-library/dom';
import React, { ReactElement, FC } from 'react';
import {
  render as coreRender, RenderOptions, RenderResult as CoreRenderResult, Queries,
} from '@testing-library/react';
import { HighlightSlate } from '../components/highlightSlate';

const Providers: FC = ({ children }) => <HighlightSlate>{children}</HighlightSlate>;

export type RenderResult<Q extends Queries = typeof queries> = CoreRenderResult<Q> & {
  getHostHTMLElement<E extends Element = HTMLElement>(): E;
};

export const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const coreResult = coreRender(ui, { wrapper: Providers, ...options });
  const result: RenderResult = {
    ...coreResult,
    getHostHTMLElement: <E extends Element = HTMLElement>() => coreResult.container.firstElementChild as E,
  };

  return result;
};

export * from '@testing-library/react';
