import { routing } from '../../../app/routes';

const routes = Object.entries(routing).reduce((acc, [, value]) => ({
  ...acc,
  [value.type]: (tracking = null, state = null, href) => [
    'trackPageView',
    value.title,
    href,
    null
  ]
}));

export default routes;
