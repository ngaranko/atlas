import { routing } from '../../../app/routes';

const mappedRoutes = {};
// eslint-disable-next-line array-callback-return
Object.keys(routing).map((key) => {
  mappedRoutes[routing[key].type] = () => [
    'trackPageView',
    routing[key].title,
    window.location.href,
    null
  ];
});

const routes = mappedRoutes;

export default routes;
