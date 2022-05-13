import { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact, Editable } from 'slate-react';
import { withHistory } from 'slate-history';
import {} from '@src/index';
import SlateElement from '../components/slateElement';

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
    <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
      <Editable
        renderElement={(elProps) => <SlateElement {...elProps} />}
        spellCheck={false}
        placeholder="Please enter some text"
      />
    </Slate>
  );
};

export default Home;
