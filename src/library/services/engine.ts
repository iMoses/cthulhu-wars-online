import { ErrorInfo } from 'react';
import type { IOC } from '@src/ioc';

export class Engine {
  #session;

  constructor({ session }: IOC) {
    this.#session = session;
  }

  reportError(error: Error, errorInfo: ErrorInfo, extraInfo?: object) {
    console.error(error, errorInfo, extraInfo);
  }
}
