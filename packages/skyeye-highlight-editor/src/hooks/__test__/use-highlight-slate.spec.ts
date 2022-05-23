import { renderHook } from '@testing-library/react-hooks';
import { useHighlightSlate } from '../use-highlight-slate';
import slateEditor from '../../__mocks__/slate-editor';

describe('useHighlightSlate()', () => {
  it('should throw error if editor type isn\'t assigned to HighlightEditor type', () => {
    const { result } = renderHook(() => useHighlightSlate(slateEditor.createMockBaseEditor()));

    expect(result.error).toEqual(Error('The slate editor type isn\'t assigned to HighlightEditor type.'));
  });
});
