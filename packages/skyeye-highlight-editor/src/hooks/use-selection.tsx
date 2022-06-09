import React, { useContext, useCallback, MouseEventHandler } from 'react';
import {
  Editor, Range, NodeEntry, Node, Text, Path,
} from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { useHighlightSlate, HighlightEditor } from './use-highlight-slate';
import type { Select } from '../components/highlightLeaf';
import { wrapperClassNameMapping } from '../components/highlightLeaf';

export const SelectedTextContext = React.createContext<[string, (txt: string) => void]>(null);
export const UnDecorateListContext = React.createContext<[Range[], React.Dispatch<React.SetStateAction<Range[]>>]>(null);

type MouseHandlersFactory = (props: MouseHandlersFactoryProps) => {
  onMouseUp: MouseEventHandler;
  onMouseDown: MouseEventHandler;
};

type MouseHandlersFactoryProps = {
  validator?: (builtInValidator: (editor: HighlightEditor) => void, event: React.MouseEvent<HTMLDivElement>, editor: HighlightEditor) => boolean;
  callback?: (event: React.MouseEvent<HTMLDivElement>, editor: HighlightEditor) => void;
};

type MouseUpHandlerFactoryProps = {
  validator?: (event: React.MouseEvent<HTMLDivElement>, editor: HighlightEditor) => boolean;
  callback?: (event: React.MouseEvent<HTMLDivElement>, editor: HighlightEditor) => void;
};

type MouseUpHandlerFactory = ({ validator, callback }: MouseUpHandlerFactoryProps) => MouseEventHandler;

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

const builtInMouseUpConstraint = (editor: HighlightEditor) => {
  const { selection } = editor;
  const {
    anchor: { path: aPath },
    focus: { path: fPath },
  } = selection;

  if (!Path.equals(aPath, fPath) || Editor.string(editor, editor.selection).includes('\n')) {
    throw new Error('Selection Constaint: Cross Paragraph Or Highlight Text Selection');
  }
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
    ({ validator, callback }) => (event: React.MouseEvent<HTMLDivElement>) => {
      if (validator && typeof validator === 'function' && !validator(event, editor)) return;

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

      const slateTextDomNode = highlightSelectedNode.parentNode;

      const leafIdxInText = Array.from(slateTextDomNode.children).findIndex((el) => highlightSelectedNode.isSameNode(el));
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

  const createMouseHandlers: MouseHandlersFactory = useCallback(
    (props) => ({
      onMouseUp: createMouseUpHandler({
        validator: (event, e) => {
          if ('validator' in props && typeof props.validator === 'function') {
            return props.validator(builtInMouseUpConstraint, event, e);
          }

          try {
            builtInMouseUpConstraint(e);
          } catch (err) {
            return false;
          }

          return true;
        },
        callback: props.callback,
      }),
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
