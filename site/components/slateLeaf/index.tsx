import React from 'react';
import { HighlightLeaf } from 'skyeye-highlight-editor';
import type { RenderLeafProps } from 'slate-react';
import { classes } from './classes';

const ChildrenWrapper = (props: Pick<RenderLeafProps, 'children'>) => {
  const { children } = props;

  return <span style={{ position: 'relative' }}>{children}</span>;
};

const SelectedLeaf = ({ children }: { children: React.ReactNode }) => (
  <ChildrenWrapper>
    <span className={classes.selected}>{children}</span>
  </ChildrenWrapper>
);

const SlateLeaf = (props: RenderLeafProps) => {
  const { children, ...rest } = props;

  return (
    <HighlightLeaf {...rest}>
      {(highlightLeaf) => {
        if (!('select' in highlightLeaf) || !highlightLeaf.select || highlightLeaf.select === 'DESELECTED') return <ChildrenWrapper>{children}</ChildrenWrapper>;

        return <SelectedLeaf>{children}</SelectedLeaf>;
      }}
    </HighlightLeaf>
  );
};

export default SlateLeaf;
