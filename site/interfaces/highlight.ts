import type { Descendant } from 'slate';

export type ElementType = 'HIGHLIGHT';

export type Element = {
  type: ElementType;
  children: Descendant[];
};
