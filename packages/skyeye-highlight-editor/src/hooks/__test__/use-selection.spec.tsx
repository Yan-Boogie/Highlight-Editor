import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useSelection } from '../use-selection';
import { HighlightSlate } from '../../components/highlightSlate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wrapper = ({ children }) => <HighlightSlate>{children}</HighlightSlate>;

describe('useSelection()', () => {
  it('should throw error if it isn\'t used inside the <HighlightSlate> component', () => {
    const { result } = renderHook(() => useSelection());

    expect(result.error).toEqual(Error('The `useSelection` hook must be used inside the <HighlightSlate> component\'s context.'));
  });
});
