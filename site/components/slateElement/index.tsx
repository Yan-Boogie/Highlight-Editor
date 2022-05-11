import { ReactNode, FC } from 'react';

import { classes } from './classes';

export interface ISlateNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any;
  children: ReactNode;
}

export interface IElement extends ISlateNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: any;
}

const SlateElement: FC<IElement> = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'H1':
      return (
        <h1 className={classes.h1} variant="h1" {...attributes}>
          {children}
        </h1>
      );

    case 'H2':
      return (
        <h2 className={classes.h2} variant="h2" {...attributes}>
          {children}
        </h2>
      );

    case 'H3':
      return (
        <h3 className={classes.h3} variant="h3" {...attributes}>
          {children}
        </h3>
      );

    case 'H4':
      return (
        <h4 className={classes.h4} variant="h4" {...attributes}>
          {children}
        </h4>
      );

    case 'H5':
      return (
        <h5 className={classes.h5} variant="h5" {...attributes}>
          {children}
        </h5>
      );

    case 'H6':
      return (
        <h6 className={classes.h6} variant="h6" {...attributes}>
          {children}
        </h6>
      );

    case 'META':
      return (
        <span className={classes.metaData} {...attributes}>
          {children}
        </span>
      );

    case 'PARAGRAPH':
      return (
        <p className={classes.body} component="article" {...attributes}>
          {children}
        </p>
      );

    case 'DIVIDER':
      return <hr className={classes.divider} />;

    case 'LINK':
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      );

    case 'LIST':
      return <ul {...attributes}>{children}</ul>;

    case 'LIST_ITEM':
      return <li {...attributes}>{children}</li>;

    case 'DIV':
      return (
        <div className={classes.body} {...attributes}>
          {children}
        </div>
      );

    default:
      return null;
  }
};

export default SlateElement;
