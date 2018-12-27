import get from 'lodash.get';
import queryString from 'querystring';
import createHistory from 'history/createBrowserHistory';

/**
 * ParamsRegistry manages the relations between url parameters, reducers and routes.
 * Since we want to reuse url parameter keys over difference routes and reducers, we can build these
 * by adding routes to each key, that holds only one reducer.
 * Why only one per route per param?
 * Otherwise a dependency will exist between reducers. Example: if we have a url param called "view"
 * that is used in reducers A and B. If in the same route reducer A sets the value of "view",
 * reducer B also updates, as it is in sync with the url param.
 */
class ParamsRegistery {
  static getDefaultReducerSettings(obj) {
    const reducerSettingsKeys = {
      encode: 'encode',
      decode: 'decode',
      stateKey: 'stateKey',
      defaultValue: 'defaultValue',
      reducerKey: 'reducerKey'
    };
    const { encode, decode, stateKey, reducerKey, defaultValue } = reducerSettingsKeys;
    const allowedKeys = [encode, decode, stateKey, reducerKey, defaultValue];
    const requiredKeys = [stateKey, reducerKey];

    requiredKeys.forEach((value) => {
      if (!Object.prototype.hasOwnProperty.call(obj, value)) {
        throw new Error(`Reducer settings passed to the route is missing a key: "${value}"`);
      }
    });

    Object.keys(obj).forEach((value) => {
      if (!allowedKeys.includes(value)) {
        throw new Error(`Key given to reducer settings is not allowed: "${value}"`);
      }
    });

    return {
      encode: (state) => get(state, `[${obj.reducerKey}][${obj.stateKey}]`),
      decode: (val) => val,
      ...obj
    };
  }

  /**
   *
   * @param routerNamespace
   * @returns {ParamsRegistery}
   *
   * @example
   * const paramsRegistery = new ParamsRegistery('ROUTE_NAMESPACE')
   * paramsRegistery.addParameter('view', (routes) => {
   *     routes
   *     .add('ROUTE_NAMESPACE/search', {
   *         stateKey: 'view',
   *         reducerKey: 'searchReducer'
   *     })
   *     .add('ROUTE_NAMESPACE/about', {
   *         stateKey: 'view',
   *         reducerKey: 'userReducer'
   *     })
   * }).addParameter('anotherParam', ...
   */
  constructor(routerNamespace = 'ROUTER') {
    this.queryParamResult = {};
    this.addParameter = this.addParameter.bind(this);
    this.getStateFromQueries = this.getStateFromQueries.bind(this);
    this.bindRouteToReducerSettings = this.bindRouteToReducerSettings.bind(this);

    this.settings = {
      routerNamespace
    };

    this.separateHistory = createHistory();

    return this;
  }

  addParameter(param, callback) {
    if (this.result[param]) {
      throw new Error(`Parameter is already registered: ${param}`);
    }
    const routeApi = {
      add: (routes, reducerObject, addHistory = false) => {
        [...Array.isArray(routes) ? [...routes] : [routes]].forEach((route) => {
          this.bindRouteToReducerSettings(param, route, reducerObject, addHistory);
        });
        return routeApi;
      }
    };

    const setDefaultValue = (defaultValue) => {
      this.result = {
        [param]: {
          ...this.result[param],
          defaultValue
        }
      };
    };

    callback(routeApi, setDefaultValue);

    return this;
  }

  /**
   *
   * @param param String
   * @param route String
   * @param reducerObject Object
   * @param addHistory Boolean
   */
  bindRouteToReducerSettings(param, route, reducerObject, addHistory) {
    let paramRouteReducerSettings = get(this.result, `[${param}].routes`, {});
    if (paramRouteReducerSettings[route]) {
      throw new Error(`Route is already registered for parameter "${param}" with route "${route}"`);
    }

    paramRouteReducerSettings = {
      ...paramRouteReducerSettings,
      [route]: {
        ...ParamsRegistery.getDefaultReducerSettings(reducerObject),
        addHistory
      }
    };

    this.result = {
      [param]: {
        ...this.result[param],
        routes: paramRouteReducerSettings
      }
    };
  }

  setQueriesFromState(locationType, state) {
    let addHistory = false;
    const query = Object.entries(this.result).reduce((acc, [key, value]) => {
      const reducerObject = get(value, `[routes][${locationType}]`, null);
      const encodedValue = reducerObject && reducerObject.encode(state);

      // We need to set addHistory to true if even one route needs to change the history
      if (!addHistory && (reducerObject && reducerObject.addHistory)) {
        addHistory = reducerObject.addHistory;
      }
      let newQuery = {};
      if (
        encodedValue &&
        encodedValue !== value.defaultValue &&
        encodedValue !== reducerObject.defaultValue
      ) {
        newQuery = { [key]: encodedValue };
      }
      return {
        ...acc,
        ...newQuery
      };
    }, {});
    const orderedQuery = Object.entries(query).sort().reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value
    }), {});

    const searchQuery = queryString.stringify(orderedQuery);
    const currentPath = window.location.pathname;
    // NOTE: changing history using different history wrapper than the one used in
    // redux-first-router! We need to work with a different history object to prevent
    // redux-first-router from reacting to query changes. If we were to use the same history object,
    // a route change would fire for every query change.
    // TODO: refactor, fix hack or start resolution trajectory for redux-first-router
    if (addHistory) {
      this.separateHistory.push(`${currentPath}?${searchQuery}`);
    } else {
      // console.log(`${currentPath}?${searchQuery}`);
      this.separateHistory.replace(`${currentPath}?${searchQuery}`);
    }

    return searchQuery;
  }

  /**
   * Used by reducers to retrieve the state from action.meta.query.
   * @param reducerKey
   * @param action
   * @returns {*}
   */
  getStateFromQueries(reducerKey, action) {
    return ((action.type && action.type.startsWith(this.settings.routerNamespace)) ?
      Object.entries(this.result).reduce((acc, [key, value]) => {
        const reducerObject = get(value, `[routes][${action.type}]`, {});
        return (reducerObject.reducerKey === reducerKey) ? {
          ...acc,
          [reducerObject.stateKey]: reducerObject.decode(
            get(action, `meta.query[${key}]`, this.result[key].defaultValue)
          )
        } : acc;
      }, {}) : {});
  }

  set result(result) {
    this.queryParamResult = {
      ...this.queryParamResult,
      ...result
    };
  }

  get result() {
    return this.queryParamResult;
  }
}

export default ParamsRegistery;
