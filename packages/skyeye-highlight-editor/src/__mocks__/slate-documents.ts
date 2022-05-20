import type { HighlightLeafType } from '../components/highlightLeaf';

export const documentWithoutSelectedLeaf = [
  {
    type: 'PARAGRAPH',
    children: [{ text: 'Text paragraph without leaf', select: null }],
  },
];

export const selectedLeaf: HighlightLeafType = {
  text: 'selected',
  select: 'SELECTED',
};

export const deselectedLeaf: HighlightLeafType = {
  text: 'deselected',
  select: 'DESELECTED',
};

export const leafNotHighlightLeafType: Omit<HighlightLeafType, 'select'> = {
  text: 'base leaf',
};

export const leafWithNullSelected: HighlightLeafType = {
  text: 'Base text',
  select: null,
};
