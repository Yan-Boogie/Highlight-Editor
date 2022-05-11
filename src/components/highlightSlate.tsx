import React, { useState, PropsWithChildren } from 'react';
import type { Range } from 'slate';
import { SelectedTextContext, UnDecorateListContext } from '../hooks/use-selection';

export type HighlightSlateProps = {
  initialValue?: {
    selectedText?: string;
    unDecorated?: Range[];
  };
};

export type IHighlightSlate = PropsWithChildren<HighlightSlateProps>;

const HighlightSlate = (props: IHighlightSlate) => {
  const { initialValue, children } = props;
  const [selectedTxt, setSelected] = useState(initialValue?.selectedText || '');
  const [unDecoratedList, setUnDecorated] = useState(initialValue?.unDecorated || []);

  return (
    <SelectedTextContext.Provider value={[selectedTxt, setSelected]}>
      <UnDecorateListContext.Provider value={[unDecoratedList, setUnDecorated]}>
        {children}
      </UnDecorateListContext.Provider>
    </SelectedTextContext.Provider>
  );
};

HighlightSlate.defaultProps = {
  initialValue: null,
};

export default HighlightSlate;
