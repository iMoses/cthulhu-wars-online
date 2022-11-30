import Bottle, { IContainer } from 'bottlejs';
import { camelCase } from 'lodash';
import * as services from '@src/library/services';
import type { CamelCase } from '@src/library/type-helpers';
import { bindInstanceMethods } from '@src/library/utils/object-utils';

type ServiceMap = typeof services;

export type IOC = {
  [T in keyof ServiceMap as CamelCase<T>]: InstanceType<ServiceMap[T]>;
};

export const bottle = new Bottle();
export default bottle.container as IOC & IContainer;

for (const [serviceName, Service] of Object.entries(services)) {
  bottle.factory(camelCase(serviceName), (container: IOC & IContainer) =>
    bindInstanceMethods(new Service(container))
  );
}
