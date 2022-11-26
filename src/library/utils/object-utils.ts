import { bindAll } from 'lodash';

export function bindInstanceMethods(instance: unknown) {
  const prototype = Object.getPrototypeOf(instance);
  const methods = Object.getOwnPropertyNames(prototype).filter(
    (propertyName: keyof typeof instance) =>
      typeof instance[propertyName] === 'function' &&
      propertyName !== 'constructor'
  );
  return bindAll(instance, methods);
}
