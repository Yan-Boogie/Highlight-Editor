import type { BaseEditor } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';

import * as Typography from './typography';
import * as Meta from './meta';
import * as Divider from './divider';
import * as Paragraph from './paragraph';
import * as Link from './link';
import * as Text from './text';
import * as ListItem from './listItem';
import * as Div from './div';
import * as Highlight from './highlight';
import * as Editting from './editting';

export {
  Typography, Meta, Divider, Paragraph, Text, Link, ListItem, Highlight, Editting,
};

export type ElementTypes =
  | Typography.ElementType
  | Meta.ElementType
  | Divider.ElementType
  | Paragraph.ElementType
  | Link.ElementType
  | ListItem.ElementType
  | Div.ElementType
  | Highlight.ElementType
  | Editting.ElementType;

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type CustomElement =
  | Typography.Element
  | Meta.Element
  | Divider.Element
  | Paragraph.Element
  | Link.Element
  | ListItem.Element
  | Div.Element
  | Highlight.Element
  | Editting.Element;

export type CustomText = Text.CustomText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
