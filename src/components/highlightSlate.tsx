import React, { useState, PropsWithChildren } from 'react';
import type { Range } from 'slate';
import { SelectedTextContext, UnDecorateListContext } from '../hooks/use-selection';

export type HighlightSlateProps = {
  initialValue?: {
    selectedText?: string;
    unDecorated?: Range[];
  };
  setSelected?: (txt: string) => void;
};

export type IHighlightSlate = PropsWithChildren<HighlightSlateProps>;

/**
 *
 * @param props IHighlightSlate
 * @returns Initialized Provider JSX component
 */
const HighlightSlate = (props: IHighlightSlate) => {
  const { initialValue, children, setSelected } = props;
  const [unDecoratedList, setUnDecorated] = useState(initialValue?.unDecorated || []);

  return (
    <SelectedTextContext.Provider value={[initialValue?.selectedText || '', setSelected]}>
      <UnDecorateListContext.Provider value={[unDecoratedList, setUnDecorated]}>
        {children}
      </UnDecorateListContext.Provider>
    </SelectedTextContext.Provider>
  );
};

HighlightSlate.defaultProps = {
  initialValue: null,
  setSelected: null,
};

export default HighlightSlate;
