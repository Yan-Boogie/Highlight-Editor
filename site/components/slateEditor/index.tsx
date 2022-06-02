import React, { useState } from 'react';
import { Editable } from 'slate-react';
import { useSelection } from 'skyeye-highlight-editor';
import SlateElement from '../slateElement';
import SlateLeaf from '../slateLeaf';

const SlateEditor = () => {
  const [message, setMessage] = useState();
  const { createDecorate, createMouseHandlers } = useSelection();

  console.log('message-->\n', message);

  const decorate = createDecorate({});
  const mouseHandlers = createMouseHandlers({
    validator: (builtInValidator, _event, editor) => {
      try {
        builtInValidator(editor);
      } catch (e) {
        setMessage(e);

        return false;
      }

      return true;
    },
  });

  return (
    <Editable
      decorate={decorate}
      {...mouseHandlers}
      renderElement={(elProps) => <SlateElement {...elProps} />}
      renderLeaf={(lfProps) => <SlateLeaf {...lfProps} />}
      spellCheck={false}
      placeholder=""
      onDOMBeforeInput={(event: InputEvent) => {
        event.preventDefault();
      }}
      style={{ caretColor: '#FFF' }}
    />
  );
};

export default SlateEditor;
