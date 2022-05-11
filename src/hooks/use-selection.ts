import React from 'react';
import type { Range } from 'slate';

/**
 * @todo
 * Type adjust
 */

export const SelectedTextContext = React.createContext<[string, (s: string) => void]>(['', () => {}]);
export const UnDecorateListContext = React.createContext<[Range[], (r: Range[]) => void]>([[], () => {}]);

export const useSelection = () => {};
