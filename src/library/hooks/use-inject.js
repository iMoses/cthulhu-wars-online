import { createContext, useContext } from 'react';
import ioc from '@src/library/ioc';

const InjectContext = createContext(ioc);

export function useInject() {
  return useContext(InjectContext);
}
