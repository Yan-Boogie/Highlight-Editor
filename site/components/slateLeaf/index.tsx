import React, { forwardRef, useLayoutEffect, useRef } from 'react';
import { HighlightLeaf } from 'skyeye-highlight-editor';
import type { RenderLeafProps } from 'slate-react';
import { classes } from './classes';

const SelectedLeaf = forwardRef<HTMLElement, any>(({ children, hiddenSpan }, ref) => (
  <>
    <span ref={hiddenSpan} className={classes.hiddenSpan} />
    <span ref={ref} className={classes.selected}>
      {children}
    </span>
  </>
));

const ChildrenWrapper = (props: Pick<RenderLeafProps, 'attributes' | 'children'>) => {
  const { attributes, children } = props;

  return (
    <span {...attributes} style={{ position: 'relative' }}>
      {children}
    </span>
  );
};

const SlateLeaf = (props: RenderLeafProps) => {
  const { children, attributes, leaf } = props;
  const hiddenSpan = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!ref.current || !hiddenSpan.current) return;

    const newWidth = ref.current.offsetWidth;

    hiddenSpan.current.style.setProperty('width', `${newWidth}px`);
  }, []);

  return (
    <ChildrenWrapper attributes={attributes}>
      <HighlightLeaf leaf={leaf}>
        {(highlightLeaf) => {
          if (!highlightLeaf.select) return children;

          return (
            <SelectedLeaf ref={ref} hiddenSpan={hiddenSpan}>
              {children}
            </SelectedLeaf>
          );
        }}
      </HighlightLeaf>
    </ChildrenWrapper>
  );
};

export default SlateLeaf;
