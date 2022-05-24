import React, { useState, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact, Editable } from 'slate-react';
import { withHistory } from 'slate-history';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { render } from '../../__test-utils__';
import { useSelection } from '../use-selection';
import { HighlightSlate } from '../../components/highlightSlate';
import type { HighlightEditor } from '../use-highlight-slate';
import { documentWithSelectedLeaf } from '../../__mocks__/slate-documents';

describe('useSelection()', () => {
  it('should throw error if it isn\'t used inside the <HighlightSlate> component', () => {
    const { result } = renderHook(() => useSelection());

    expect(result.error).toEqual(Error('The `useSelection` hook must be used inside the <HighlightSlate> component\'s context.'));
  });

  it('should decorate leaf when user selected text in editor', () => {
    const HookWrapper = ({ children }) => {
      const [value, setValue] = useState<Descendant[]>(documentWithSelectedLeaf);
      const editor = useMemo(() => withHistory(withReact(createEditor() as HighlightEditor)), []);

      return (
        <HighlightSlate>
          <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
            {children}
          </Slate>
        </HighlightSlate>
      );
    };

    const Wrapper = ({ children }) => {
      const [value, setValue] = useState<Descendant[]>(documentWithSelectedLeaf);
      const editor = useMemo(() => withHistory(withReact(createEditor() as HighlightEditor)), []);

      return (
        <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
          {children}
        </Slate>
      );
    };

    const { result } = renderHook(() => useSelection(), { wrapper: HookWrapper });
    const { current } = result;
    const decorate = current.createDecorate({});

    const { queryByText } = render(
      <Wrapper>
        <Editable decorate={decorate} />
      </Wrapper>,
    );

    expect(queryByText(/Text paragraph with leaf/i)).not.toBeInTheDocument();
  });

  /**
   * @todo
   */
  it('should undecorate leaf when user clicked decorated leaf button', () => {});
});
