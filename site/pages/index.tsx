import { useMemo, useState } from 'react';
import { css } from '@emotion/css';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { HighlightSlate } from 'skyeye-highlight-editor';
import SlateEditor from '../components/slateEditor';
import type { CustomEditor, ElementTypes } from '../interfaces';

const initialValue: Descendant[] = [
  {
    type: 'H1',
    children: [{ text: 'Article Title Example', select: null }],
  },
  {
    type: 'META',
    children: [{ text: 'Article Subtitle Example', select: null }],
  },
  {
    type: 'DIVIDER',
    children: [{ text: '', select: null }],
  },
  {
    type: 'DIV',
    children: [
      { text: 'This is an example with ', select: null },
      { type: 'HIGHLIGHT', children: [{ text: 'HIGHLIGHTED TEXT', select: null }] },
      { text: ' and ', select: null },
      { type: 'EDITTING', children: [{ text: 'EDITTING TEXT', select: null }] },
      { text: '. They are just for the demonstration of the blocking of selection. Try to select words overlaps them!', select: null },
    ],
  },
];

const classes = {
  wrapper: css`
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 720px;
    padding: 28px 0;
  `,
  inputSection: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 0;
  `,
  input: css`
    margin: 0 0 0 8px;
    height: 32px;
    outline: none;
    border: 0;
    border-bottom: solid 1px;
  `,
  slateWrapper: css`
    padding: 16px 0;
  `,
};

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
  const [text, setText] = useState<string>();

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputSection}>
        <span>Keyword : </span>
        <input type="search" placeholder="Search the keyword..." onChange={(e) => setText(e.target.value)} className={classes.input} value={text} />
      </div>
      <div className={classes.slateWrapper}>
        <HighlightSlate selectedText={text} setSelectedTxt={setText}>
          <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
            <SlateEditor />
          </Slate>
        </HighlightSlate>
      </div>
    </div>
  );
};

export default Home;
