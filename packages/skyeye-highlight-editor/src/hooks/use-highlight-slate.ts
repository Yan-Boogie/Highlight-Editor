import type { BaseEditor } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';

export type HighlightEditor = BaseEditor & ReactEditor & HistoryEditor;

const isHighlightEditor = (editor: any): editor is HighlightEditor => 'insertData' in editor && 'setFragmentData' in editor && 'history' in editor && 'undo' in editor && 'redo' in editor;

export const useHighlightSlate = (editor: BaseEditor) => {
  if (!isHighlightEditor(editor)) {
    throw new Error('The slate editor type isn\'t assigned to HighlightEditor type.');
  }

  return editor;
};
