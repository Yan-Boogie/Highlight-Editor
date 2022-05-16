import { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { HighlightSlate } from 'skyeye-highlight-editor';
import SlateEditor from '../components/slateEditor';

const initialValue: Descendant[] = [
  {
    type: 'PARAGRAPH',
    children: [{ text: '' }],
  },
];

const Home = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <HighlightSlate>
      <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
        <SlateEditor />
      </Slate>
    </HighlightSlate>
  );
};

export default Home;
