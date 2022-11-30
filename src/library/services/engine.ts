import { ErrorInfo } from 'react';
import type { IOC } from '@src/ioc';

export class Engine {
  #session;

  constructor({ session }: IOC) {
    this.#session = session;
  }

  reportError(
    error: Error,
    errorInfo: ErrorInfo,
    extraInfo?: Record<string, unknown>
  ) {
    console.error(error, errorInfo, extraInfo);
  }
}
