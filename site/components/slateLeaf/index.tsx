import React from 'react';
import { HighlightLeaf } from 'skyeye-highlight-editor';
import type { RenderLeafProps } from 'slate-react';
import { classes } from './classes';

const SelectedLeaf = ({ children }: { children: React.ReactNode }) => <span className={classes.selected}>{children}</span>;

const ChildrenWrapper = (props: Pick<RenderLeafProps, 'attributes' | 'children'>) => {
  const { attributes, children } = props;

  return (
    <span {...attributes} style={{ position: 'relative' }}>
      {children}
    </span>
  );
};

const SlateLeaf = (props: RenderLeafProps) => {
  const { children, attributes, leaf } = props;

  return (
    <ChildrenWrapper attributes={attributes}>
      <HighlightLeaf leaf={leaf}>
        {(highlightLeaf) => {
          if (!highlightLeaf.select || highlightLeaf.select === 'DESELECTED') return children;

          return <SelectedLeaf>{children}</SelectedLeaf>;
        }}
      </HighlightLeaf>
    </ChildrenWrapper>
  );
};

export default SlateLeaf;
