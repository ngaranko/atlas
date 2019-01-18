import paramsRegistry from '../params-registry';
import { getLocationType } from '../redux-first-router/selectors';

const urlParamsMiddleWare = ({ getState }) => (next) => (action) => {
  paramsRegistry.setQueriesFromState(getLocationType(getState()), getState(), action);
  return next(action);
};

export default urlParamsMiddleWare;
