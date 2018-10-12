import get from 'lodash.get';
import { routing } from '../../app/routes';

const DOCUMENT_TITLE = {
  SUFFIX: 'Dataportaal',
  DEFAULT_PAGE_TITLE: 'Atlas'
};

const logger = () => (next) => (action) => {
  const typeIsRoute = Object.keys(routing).map((key) => routing[key].type).includes(action.type);
  if (typeIsRoute) {
    const page = Object.keys(routing).find((key) => routing[key].type === action.type);
    const documentTitleSuffix = DOCUMENT_TITLE.SUFFIX;
    const pageTitle = get(routing, `[${page}].title`, DOCUMENT_TITLE.DEFAULT_PAGE_TITLE);

    document.title = `${pageTitle} - ${documentTitleSuffix}`;
  }
  return next(action);
};

export default logger;
