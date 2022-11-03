import { bindAll } from 'lodash';

export function bindInstanceMethods(instance) {
  const prototype = Object.getPrototypeOf(instance);
  const methods = Object.getOwnPropertyNames(prototype).filter(
    propertyName =>
      typeof instance[propertyName] === 'function' &&
      propertyName !== 'constructor'
  );
  return bindAll(instance, methods);
}
