import type { Descendant } from 'slate';

export type ElementType = 'EDITTING';

export type Element = {
  type: ElementType;
  children: Descendant[];
};
