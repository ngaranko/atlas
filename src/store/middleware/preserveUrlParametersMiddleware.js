import paramsRegistry from '../params-registry';
import { getLocationQuery } from '../redux-first-router/selectors';
import ParamsRegistery from '../params-registry/paramRegistry';

const preserveUrlParametersMiddleware = ({ getState }) => (next) => (action) => {
  let nextAction = action;
  if (nextAction.meta && (nextAction.meta.preserve || nextAction.meta.additionalParams)) {
    const additionalParams = nextAction.meta.additionalParams;
    const preserve = nextAction.meta.preserve;
    const newQuery = {
      ...(nextAction.meta.query) ? nextAction.meta.query : {},
      ...(preserve) ?
        paramsRegistry.getParametersForRoute(getLocationQuery(getState()), action.type, false) :
        {},
      ...(additionalParams) ?
        paramsRegistry.getParametersForRoute(additionalParams, action.type) :
        {}
    };

    const query = ParamsRegistery.orderQuery(newQuery);

    nextAction = {
      ...nextAction,
      meta: {
        ...nextAction.meta,
        query
      }
    };

    delete nextAction.meta.additionalParams;
    delete nextAction.meta.preserve;
  }

  return next(nextAction);
};

export default preserveUrlParametersMiddleware;
