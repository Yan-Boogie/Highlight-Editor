import type { BaseText } from 'slate';

export type CustomText =
  | BaseText
  | {
    highlighted?: boolean;
    select?: Select;
    text: string;
  };

export type Select = 'selected' | 'deSelected';
