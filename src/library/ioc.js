import Bottle from 'bottlejs';
import { createBrowserHistory } from 'history';
import { camelCase } from 'lodash';
import { bindInstanceMethods } from '@src/library/utils/object-utils.js';
import * as services from './services';

export const bottle = new Bottle();

bottle.constant('history', createBrowserHistory());

for (const [serviceName, Service] of Object.entries(services)) {
  bottle.factory(camelCase(serviceName), container =>
    bindInstanceMethods(new Service(container))
  );
}

export default bottle.container;

if (module.hot) {
  window.ioc = bottle.container;
}
