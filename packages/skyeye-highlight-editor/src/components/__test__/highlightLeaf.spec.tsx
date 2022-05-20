import React from 'react';
import { render } from '../../__test-utils__';
import { HighlightLeaf, wrapperClassNameMapping } from '../highlightLeaf';
import { selectedLeaf } from '../../__mocks__/slate-documents';

describe('<HighlightLeaf />', () => {
  it('should contain selected leaf wrapper className if leaf is selected', () => {
    const { getHostHTMLElement } = render(<HighlightLeaf leaf={selectedLeaf}>{jest.fn()}</HighlightLeaf>);
    const { classList } = getHostHTMLElement();

    expect(classList.contains(wrapperClassNameMapping.SELECTED)).toBeTruthy();
  });
});
