import React from 'react';
import type { Text } from 'slate';
import { RenderLeafProps } from 'slate-react';

export type Select = 'SELECTED' | 'DESELECTED';
export type HighlightLeafType = Text & {
  select: Select;
};

const isHighlightLeaf = (leaf: any): leaf is HighlightLeafType => 'select' in leaf;

const wrapperClassNameMapping = {
  SELECTED: 'highlight-leaf-selected',
  DESELECTED: 'highlight-leaf-deselected',
};

export interface IHighlightLeaf extends RenderLeafProps {
  children: (leafProps: Partial<RenderLeafProps>) => React.ReactNode;
}

const HighlightLeaf = (props: IHighlightLeaf) => {
  const { attributes, children, leaf } = props;

  if (!isHighlightLeaf(leaf)) {
    throw new Error('The leaf prop passed to <HighlightLeaf> must be HighlightLeaf type.');
  }

  if (!leaf.select) {
    return children({ leaf, attributes });
  }

  return (
    <span {...attributes} className={wrapperClassNameMapping[`${leaf.select}`]}>
      {children({ leaf })}
    </span>
  );
};

export default HighlightLeaf;
