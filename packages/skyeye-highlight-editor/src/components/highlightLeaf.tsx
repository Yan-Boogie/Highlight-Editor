import React from 'react';
import type { BaseText } from 'slate';
import { RenderLeafProps } from 'slate-react';

export type Select = 'SELECTED' | 'DESELECTED' | null;
export type HighlightLeafType = BaseText & {
  select: Select;
};

const isHighlightLeaf = (leaf: any): leaf is HighlightLeafType => 'select' in leaf;

export const wrapperClassNameMapping = {
  SELECTED: 'highlight-leaf-selected',
  DESELECTED: 'highlight-leaf-deselected',
};

export interface IHighlightLeaf extends Pick<RenderLeafProps, 'leaf'> {
  children: (leaf: HighlightLeafType | BaseText) => JSX.Element;
}

export const HighlightLeaf = (props: IHighlightLeaf) => {
  const { children, leaf } = props;

  if (!isHighlightLeaf(leaf) || !leaf.select) {
    return children(leaf);
  }

  if (leaf.select === 'DESELECTED') {
    return <span className={wrapperClassNameMapping.DESELECTED}>{children(leaf)}</span>;
  }

  return <span className={wrapperClassNameMapping.SELECTED}>{children(leaf)}</span>;
};
