import Bottle, { IContainer } from 'bottlejs';
import { camelCase } from 'lodash';
import * as services from '@src/library/services';
import type { CamelCase } from '@src/library/type-helpers';
import { bindInstanceMethods } from '@src/library/utils/object-utils';

type ServiceMap = typeof services;
type InstanceMap = {
  [T in keyof ServiceMap as CamelCase<T>]: InstanceType<ServiceMap[T]>;
};

export type IOC = InstanceMap & IContainer;

export const bottle = new Bottle();
export default bottle.container as IOC;

for (const [serviceName, Service] of Object.entries(services)) {
  bottle.factory(camelCase(serviceName), (container: IOC) =>
    bindInstanceMethods(new Service(container))
  );
}
