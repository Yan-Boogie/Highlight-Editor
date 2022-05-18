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
  children: (leaf: HighlightLeafType) => JSX.Element;
}

export const HighlightLeaf = (props: IHighlightLeaf) => {
  const { children, leaf } = props;

  if (!isHighlightLeaf(leaf)) {
    throw new Error('The leaf prop passed to <HighlightLeaf> must be HighlightLeaf type.');
  }

  if (!leaf.select || leaf.select === 'DESELECTED') {
    return children(leaf);
  }

  return <span className={wrapperClassNameMapping[`${leaf.select}`]}>{children(leaf)}</span>;
};
