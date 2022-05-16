import React from 'react';
import { Editable } from 'slate-react';
import { useSelection } from 'skyeye-highlight-editor';
import SlateElement from '../slateElement';

const SlateEditor = () => {
  const { createDecorate, createMouseHandlers } = useSelection();

  const decorate = createDecorate({});
  const mouseHandlers = createMouseHandlers({});

  return <Editable decorate={decorate} {...mouseHandlers} renderElement={(elProps) => <SlateElement {...elProps} />} spellCheck={false} placeholder="Please enter some text" />;
};

export default SlateEditor;
