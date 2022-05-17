import React from 'react';
import { Editable } from 'slate-react';
import { useSelection } from 'skyeye-highlight-editor';
import SlateElement from '../slateElement';
import SlateLeaf from '../slateLeaf';

const SlateEditor = () => {
  const { createDecorate, createMouseHandlers } = useSelection();

  const decorate = createDecorate({});
  const mouseHandlers = createMouseHandlers({});

  return (
    <Editable
      decorate={decorate}
      {...mouseHandlers}
      renderElement={(elProps) => <SlateElement {...elProps} />}
      renderLeaf={(lfProps) => <SlateLeaf {...lfProps} />}
      spellCheck={false}
      placeholder=""
    />
  );
};

export default SlateEditor;
