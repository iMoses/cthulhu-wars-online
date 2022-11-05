import Bottle from 'bottlejs';
import { createBrowserHistory } from 'history';
import { camelCase } from 'lodash';
import * as services from './services';
import { bindInstanceMethods } from './utils/object-utils';

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
