import React from 'react';
import { render } from '../../__test-utils__';
import { HighlightLeaf, wrapperClassNameMapping } from '../highlightLeaf';
import {
  selectedLeaf, deselectedLeaf, leafWithNullSelected, leafNotHighlightLeafType,
} from '../../__mocks__/slate-documents';

/**
 * @todo
 * Build Mock components
 */
describe('<HighlightLeaf />', () => {
  it('should throw error if leaf has no "select" column', () => {
    expect(() => render(<HighlightLeaf leaf={leafNotHighlightLeafType}>{jest.fn()}</HighlightLeaf>)).toThrow();
  });

  it('should contain selected leaf wrapper className if leaf is selected', () => {
    const { getHostHTMLElement } = render(<HighlightLeaf leaf={selectedLeaf}>{jest.fn()}</HighlightLeaf>);
    const { classList } = getHostHTMLElement();

    expect(classList.contains(wrapperClassNameMapping.SELECTED)).toBeTruthy();
  });

  it('should contain deselected leaf wrapper className if leaf is deselected', () => {
    const { getHostHTMLElement } = render(<HighlightLeaf leaf={deselectedLeaf}>{jest.fn()}</HighlightLeaf>);
    const { classList } = getHostHTMLElement();

    expect(classList.contains(wrapperClassNameMapping.DESELECTED)).toBeTruthy();
  });

  /**
   * @todo
   * Fix test case
   */
  it('shoud not contain any wrapper className if leaf get\'s null in selected column', () => {
    render(<HighlightLeaf leaf={leafWithNullSelected}>{jest.fn()}</HighlightLeaf>);
  });
});
