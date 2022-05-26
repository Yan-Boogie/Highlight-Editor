import React, { useState, PropsWithChildren } from 'react';
import { SelectedTextContext, UnDecorateListContext } from '../hooks/use-selection';

export type HighlightSlateProps = {
  selectedText: string;
  setSelectedTxt: (txt: string) => void;
};

export type IHighlightSlate = PropsWithChildren<HighlightSlateProps>;

/**
 *
 * @param props IHighlightSlate
 * @returns Initialized Provider JSX component
 */
export const HighlightSlate = (props: IHighlightSlate) => {
  const { selectedText, setSelectedTxt, children } = props;
  const [unDecorated, setUnDecorated] = useState([]);

  return (
    <SelectedTextContext.Provider value={[selectedText, setSelectedTxt]}>
      <UnDecorateListContext.Provider value={[unDecorated, setUnDecorated]}>{children}</UnDecorateListContext.Provider>
    </SelectedTextContext.Provider>
  );
};
