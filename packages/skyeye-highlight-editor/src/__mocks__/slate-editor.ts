import type { BaseEditor } from 'slate';
import type { HighlightEditor } from '../hooks/use-highlight-slate';

const mockBaseEditor: BaseEditor = {
  children: [],
  operations: [],
  selection: null,
  marks: null,
  isInline: () => false,
  isVoid: () => false,
  normalizeNode: () => {},
  onChange: () => {},
  addMark: () => {},
  apply: () => {},
  deleteBackward: () => {},
  deleteForward: () => {},
  deleteFragment: () => {},
  getFragment: () => [],
  insertBreak: () => {},
  insertSoftBreak: () => {},
  insertFragment: () => {},
  insertNode: () => {},
  insertText: () => {},
  removeMark: () => {},
};

const mockHighlightEditor: HighlightEditor = {
  ...mockBaseEditor,
  insertData: () => {},
  setFragmentData: () => {},
  hasRange: () => false,
  insertFragmentData: () => false,
  insertTextData: () => false,
  history: { redos: [[]], undos: [[]] },
  redo: () => {},
  undo: () => {},
};

export default {
  createMockBaseEditor: () => {
    const mock = jest.fn<BaseEditor, []>();

    mock.mockReturnValue(mockBaseEditor);

    return mock();
  },
  createMockHighlightEditor: () => {
    const mock = jest.fn<HighlightEditor, []>();

    mock.mockReturnValue(mockHighlightEditor);

    return mock();
  },
};
