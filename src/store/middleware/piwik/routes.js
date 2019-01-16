import { routing } from '../../../app/routes';

const routes = Object.entries(routing).reduce((acc, [, value]) => ({
  ...acc,
  [value.type]: () => [
    'trackPageView',
    value.title,
    window.location.href,
    null
  ]
}));

export default routes;
