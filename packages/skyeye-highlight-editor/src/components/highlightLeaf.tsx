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

export interface IHighlightLeaf extends Pick<RenderLeafProps, 'leaf' | 'attributes'> {
  children: (leaf: HighlightLeafType | BaseText) => JSX.Element;
}

export const HighlightLeaf = (props: IHighlightLeaf) => {
  const { children, leaf, attributes } = props;

  if (!isHighlightLeaf(leaf) || !leaf.select) {
    return <span {...attributes}>{children(leaf)}</span>;
  }

  if (leaf.select === 'DESELECTED') {
    return (
      <span {...attributes} className={wrapperClassNameMapping.DESELECTED}>
        {children(leaf)}
      </span>
    );
  }

  return (
    <span {...attributes} className={wrapperClassNameMapping.SELECTED}>
      {children(leaf)}
    </span>
  );
};
