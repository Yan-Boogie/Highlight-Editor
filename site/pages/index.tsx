import { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { HighlightSlate } from 'skyeye-highlight-editor';
import SlateEditor from '../components/slateEditor';
import type { CustomEditor, ElementTypes } from '../interfaces';

const initialValue: Descendant[] = [
  {
    type: 'DIV',
    children: [
      { text: 'This is an example with ', select: null },
      { type: 'HIGHLIGHT', children: [{ text: 'HIGHLIGHTED TEXT', select: null }] },
      { text: ' and ', select: null },
      { type: 'EDITTING', children: [{ text: 'EDITTING TEXT', select: null }] },
    ],
  },
  {
    type: 'PARAGRAPH',
    children: [{ text: 'Try the Selection feature by selecting the text', select: null }],
  },
];

const withInlines = (editor: CustomEditor): CustomEditor => {
  const { isInline } = editor;

  const inlineTypes: ElementTypes[] = ['HIGHLIGHT', 'EDITTING'];

  // eslint-disable-next-line no-param-reassign
  editor.isInline = (el) => (~inlineTypes.indexOf(el.type) ? true : isInline(el));

  return editor;
};

const Home = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withInlines(withHistory(withReact(createEditor()))), []);

  return (
    <HighlightSlate>
      <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
        <SlateEditor />
      </Slate>
    </HighlightSlate>
  );
};

export default Home;
