/**
 * @file Laoder.js
 * @version 1.0.0
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */

import requireAll from 'require-all';
import reduce from 'lodash/reduce';
import includes from 'lodash/includes';
import forEach from 'lodash/forEach';

/**
 * @class Laoder
 * @classdesc Loader's handler.
 * @author Ernesto Rojas <ernesto20145@gmail.com>
 */
class Laoder {
  /**
   * @method upRoutes
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {Application} app - Obeject with new task data.
   * @param {string} path - Obeject with new task data.
   * @param {object} opts - Obeject with new task data.
   * @description This method load the routes.
   */
  static upRoutes(app, path, opts = {}) {
    const { exclude = [] } = opts;
    const files = requireAll(path);
    forEach(files, (target, name) => {
      if (!includes(exclude, name)) {
        const { prefix, router } = target.default(app);
        app.app.use(prefix, router);
      }
    });
  }

  /**
   * @method upModels
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {Application} app - Obeject with new task data.
   * @param {string} path - Obeject with new task data.
   * @param {object} opts - Obeject with new task data.
   * @description This method load the modules.
   */
  static upModels(app, path, opts = {}) {
    const { exclude = [] } = opts;
    const files = requireAll(path);
    const models = reduce(files, (result, target, name) => {
      if (!includes(exclude, name)) {
        result[name] = new target.default(app).build();
      }
      return result;
    }, {});
		return models;
  }
  
  /**
   * @method upGeneric
   * @author Ernesto Rojas <ernesto20145@gmail.com>
   * @param {Application} app - Obeject with new task data.
   * @param {string} path - Obeject with new task data.
   * @param {object} opts - Obeject with new task data.
   * @description This method load the generic basic class.
   */
	static upGeneric(app, path, opts = {}) {
    const { exclude = [] } = opts;
    const files = requireAll(path);
    const instances = reduce(files, (result, target, name) => {
      if (!includes(exclude, name)) {
        result[name] = typeof target === 'function' ? new target(app) : new target.default(app);
      }
      return result;
    }, {});
		return instances;
	}
}

export default Laoder;
