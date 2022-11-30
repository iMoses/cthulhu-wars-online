import { createContext, useContext } from 'react';
import ioc, { IOC } from '@src/ioc';

const InjectContext = createContext(ioc);

export function useInject() {
  return useContext(InjectContext) as IOC;
}
