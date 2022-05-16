import React, { useState, PropsWithChildren } from 'react';
import type { Range } from 'slate';
import { SelectedTextContext, UnDecorateListContext } from '../hooks/use-selection';

export type HighlightSlateProps = {
  selectedText?: string;
  unDecoratedList?: Range[];
};

export type IHighlightSlate = PropsWithChildren<HighlightSlateProps>;

/**
 *
 * @param props IHighlightSlate
 * @returns Initialized Provider JSX component
 */
export const HighlightSlate = (props: IHighlightSlate) => {
  const { selectedText, unDecoratedList, children } = props;
  const [selected, setSelected] = useState(selectedText);
  const [unDecorated, setUnDecorated] = useState(unDecoratedList);

  return (
    <SelectedTextContext.Provider value={[selected, setSelected]}>
      <UnDecorateListContext.Provider value={[unDecorated, setUnDecorated]}>{children}</UnDecorateListContext.Provider>
    </SelectedTextContext.Provider>
  );
};

HighlightSlate.defaultProps = {
  selectedText: '',
  unDecoratedList: [],
};
