import React from 'react';
import { Editable } from 'slate-react';
import { useSelection } from 'skyeye-highlight-editor';
import SlateElement from '../slateElement';

const SlateEditor = () => {
  const { createMouseUpHandler, createDecorate, EditableWrapper } = useSelection();

  const decorate = createDecorate({});
  const mouseupHandler = createMouseUpHandler({});

  return (
    <EditableWrapper>
      <Editable decorate={decorate} onMouseUp={mouseupHandler} renderElement={(elProps) => <SlateElement {...elProps} />} spellCheck={false} placeholder="Please enter some text" />
    </EditableWrapper>
  );
};

export default SlateEditor;
