import get from 'lodash.get';
import { routing } from '../../app/routes';

const TITLE_SUFFIX = 'Dataportaal';
const TITLE_DEFAULT = 'Dataportaal';

const documentHead = () => (next) => (action) => {
  const typeIsRoute = Object.keys(routing).map((key) => routing[key].type).includes(action.type);
  if (typeIsRoute) {
    const page = Object.keys(routing).find((key) => routing[key].type === action.type);
    const pageTitle = get(routing, `[${page}].title`, TITLE_DEFAULT);

    document.title = `${pageTitle} - ${TITLE_SUFFIX}`;
  }
  return next(action);
};

export default documentHead;
