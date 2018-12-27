import paramsRegistry from '../params-registry';
import { getLocationType } from '../redux-first-router';
import throttle from 'lodash.throttle';

const urlParamsMiddleWare = ({ getState }) => (next) => (action) => {
//   const trot = throttle(
//     () => paramsRegistry.setQueriesFromState(getLocationType(getState()), getState()),
//     3000,
//     {
//       leading: true,
//       trailing: true
//     }
// )

  // trot();
// console.log('an')
  return next(action);
};

export default urlParamsMiddleWare;
