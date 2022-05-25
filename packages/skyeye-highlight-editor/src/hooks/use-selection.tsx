import React, { useContext, useCallback, MouseEventHandler } from 'react';
import {
  Editor, Range, NodeEntry, Node, Text,
} from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { useHighlightSlate, HighlightEditor } from './use-highlight-slate';
import type { Select } from '../components/highlightLeaf';
import { wrapperClassNameMapping } from '../components/highlightLeaf';

export const SelectedTextContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(null);
export const UnDecorateListContext = React.createContext<[Range[], React.Dispatch<React.SetStateAction<Range[]>>]>(null);

type MouseHandersFactory = (props: MouseUpHandlerFactoryProps) => {
  onMouseUp: MouseEventHandler;
  onMouseDown: MouseEventHandler;
};

type MouseUpHandlerFactoryProps = {
  fn?: (event: React.MouseEvent<HTMLDivElement>, editor: HighlightEditor) => void;
  callback?: (event: React.MouseEvent<HTMLDivElement>, editor: HighlightEditor) => void;
};

type MouseUpHandlerFactory = ({ fn, callback }: MouseUpHandlerFactoryProps) => MouseEventHandler;

type DecorateFactory = ({
  preDecorate,
  comparer,
}: {
  preDecorate?: (entry: NodeEntry<Node>) => DecorateRange[];
  comparer?: (preRanges: DecorateRange[], ranges: DecorateSelectRange[]) => DecorateRange[];
}) => (entry: NodeEntry<Node>) => DecorateRange[];

type DecorateRange = Range & {
  [K: string]: any;
};

type DecorateSelectRange = Range & {
  select: Select;
};

const defaultComparer: (preRanges: DecorateRange[], ranges: DecorateSelectRange[]) => DecorateRange[] = (preRanges, ranges) => {
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

  if (!selectedTextContext || !unDecorateListContext) {
    throw new Error('The `useSelection` hook must be used inside the <HighlightSlate> component\'s context.');
  }

  const editor = useHighlightSlate(useSlate());

  const [selectedText, setSelected] = selectedTextContext;
  const [unDecorateList, setUnDecorateList] = unDecorateListContext;

  /**
   * @todo
   * Deal with "Cross element error"
   */
  const createMouseUpHandler: MouseUpHandlerFactory = useCallback(
    ({ fn, callback }) => (event: React.MouseEvent<HTMLDivElement>) => {
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

  type HTMLElementEvent<T extends HTMLElement = HTMLElement, S extends HTMLElement = HTMLElement> = React.MouseEvent<T> & { target: S };

  const mouseDownHandler = useCallback(
    (event: HTMLElementEvent<HTMLDivElement>) => {
      const { target } = event;
      const highlightSelectedNode = target.closest(`.${wrapperClassNameMapping.SELECTED}`);

      if (!highlightSelectedNode) return;

      const slateTextDomNode = highlightSelectedNode.closest('span[data-slate-node="text"]');

      const leafIdxInText = Array.from(slateTextDomNode.children).findIndex((el) => highlightSelectedNode.parentNode.isSameNode(el));
      const leafSequenceIdx = leafIdxInText % 2 ? (leafIdxInText - 1) / 2 : leafIdxInText / 2;

      const slateTextNode = ReactEditor.toSlateNode(editor, slateTextDomNode);

      const parts = Node.string(slateTextNode).split(selectedText);
      const path = ReactEditor.findPath(editor, slateTextNode);

      const { range } = Array.from(Array(leafSequenceIdx + 2)).reduce<{ range: Range; offset: number }>(
        (prev, _, idx) => {
          const newOffset = prev.offset + parts[idx].length + selectedText.length;

          /**
           * Pass directly if its first item
           */
          if (!idx) {
            return {
              range: null,
              offset: newOffset,
            };
          }

          const newRange = {
            anchor: { path, offset: prev.offset - selectedText.length },
            focus: { path, offset: prev.offset },
          };

          return {
            range: newRange,
            offset: newOffset,
          };
        },
        {
          range: null,
          offset: 0,
        },
      );

      setUnDecorateList((prev) => [...prev, range]);
    },
    [selectedText, editor, setUnDecorateList],
  );

  const createMouseHandlers: MouseHandersFactory = useCallback(
    (props) => ({
      onMouseUp: createMouseUpHandler(props),
      onMouseDown: mouseDownHandler,
    }),
    [createMouseUpHandler, mouseDownHandler],
  );

  const createDecorate: DecorateFactory = useCallback(
    ({ preDecorate, comparer }) => (entry) => {
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
                select: 'DESELECTED',
              });
            }
          }

          offset = offset + part.length + selectedText.length;
        });
      }

      return comparer && typeof comparer === 'function' ? comparer(preRanges, ranges) : defaultComparer(preRanges, ranges);
    },
    [selectedText, unDecorateList],
  );

  return {
    createDecorate,
    createMouseHandlers,
  };
};
