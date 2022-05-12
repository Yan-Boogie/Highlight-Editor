import React, { useContext, useCallback, MouseEventHandler } from 'react';
import {
  Editor, Range, NodeEntry, Node, Text,
} from 'slate';
import { ReactEditor } from 'slate-react';
import { useHighlightSlate, HighlightEditor } from './use-highlight-slate';

/**
 * @todo
 * Move to other file
 */
type Select = 'SELECTED' | 'DE_SELECTED';

export const SelectedTextContext = React.createContext<[string, (s: string) => void]>(null);
export const UnDecorateListContext = React.createContext<[Range[], (r: Range[]) => void]>(null);

type MouseUpHandlerFactory = (
  fn?: (event: React.MouseEvent<HTMLDivElement>, editor: HighlightEditor) => void,
  callback?: (event: React.MouseEvent<HTMLDivElement>, editor: HighlightEditor) => void
) => MouseEventHandler;

type DecorateFactory = (
  preDecorate?: (entry: NodeEntry<Node>) => DecorateRange[],
  comparer?: (preRanges: DecorateRange[], ranges: DecorateSelectRange[]) => DecorateRange[]
) => (entry: NodeEntry<Node>) => DecorateRange[];

type DecorateRange = Range & {
  [K: string]: any;
};

type DecorateSelectRange = Range & {
  select: Select;
};

const defaultComparer: (preRanges: DecorateRange[], ranges: DecorateSelectRange[]) => DecorateRange[] = (
  preRanges,
  ranges,
) => {
  const getRangeString = (range: DecorateRange): string => {
    const { anchor, focus } = range;

    return `${anchor.path.join(',')}-${anchor.offset}-${focus.path.join(',')}-${focus.offset}`;
  };

  const map = new Map<string, DecorateRange>();

  preRanges.forEach((r) => map.set(getRangeString(r), { ...r }));
  ranges.forEach((r) => {
    const rValue = map.get(getRangeString(r));

    return !!rValue ? map.set(getRangeString(r), { ...rValue, ...r }) : map.set(getRangeString(r), { ...r });
  });

  return Array.from(map.values());
};

export const useSelection = () => {
  const selectedTextContext = useContext(SelectedTextContext);
  const unDecorateListContext = useContext(UnDecorateListContext);
  const editor = useHighlightSlate();

  if (!selectedTextContext || !unDecorateListContext) {
    throw new Error('The `useSelection` hook must be used inside the <HighlightSlate> component\'s context.');
  }

  const [selectedText, setSelected] = selectedTextContext;
  const [unDecorateList, setUnDecorateList] = unDecorateListContext;

  const createMouseUpHandler: MouseUpHandlerFactory = useCallback(
    (fn, callback) => (event: React.MouseEvent<HTMLDivElement>) => {
      if (fn && typeof fn === 'function') fn(event, editor);

      const { selection } = editor;
      const selected = Editor.string(editor, editor.selection);

      if (!selection || !ReactEditor.isFocused(editor) || Range.isCollapsed(selection) || !selected) return;

      if (selected === selectedText) return;

      /**
       * Reset 'unDecorateList' if re-selected
       */
      setUnDecorateList([]);

      setSelected(selected);

      if (callback && typeof callback === 'function') callback(event, editor);
    },
    [editor, selectedText, setSelected, setUnDecorateList],
  );

  const createDecorate: DecorateFactory = useCallback(
    (preDecorate, comparer) => (entry) => {
      const preRanges: DecorateRange[] = preDecorate && typeof preDecorate === 'function' ? preDecorate(entry) : [];
      const ranges: DecorateSelectRange[] = [];
      const [node, path] = entry;

      if (selectedText && Text.isText(node)) {
        const { text } = node;
        const parts = text.split(selectedText);
        let offset = 0;

        /**
         * Insert leaf between two 'parts'
         */
        parts.forEach((part, i) => {
          if (i !== 0) {
            const range: Range = {
              anchor: { path, offset: offset - selectedText.length },
              focus: { path, offset },
            };

            const unDecorateIdx = unDecorateList.findIndex((r) => Range.includes(r, range));

            if (!~unDecorateIdx) {
              ranges.push({
                ...range,
                select: 'SELECTED',
              });
            } else {
              ranges.push({
                ...range,
                select: 'DE_SELECTED',
              });
            }
          }

          offset = offset + part.length + selectedText.length;
        });
      }

      return comparer && typeof comparer === 'function'
        ? comparer(preRanges, ranges)
        : defaultComparer(preRanges, ranges);
    },
    [selectedText, unDecorateList],
  );

  return {
    createMouseUpHandler,
    createDecorate,
  };
};
