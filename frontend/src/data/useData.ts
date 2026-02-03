import { createContext, useContext } from 'react';
import type { ICtx } from '../types';

export const DataContext = createContext<ICtx | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
