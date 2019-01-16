import get from 'lodash.get';
import { routing } from '../../app/routes';
import { VIEWS } from '../../shared/ducks/data-search/constants';
import getTitle from '../../detail/services/document-title/document-title';

const TITLE_SUFFIX = 'Dataportaal';
const TITLE_DEFAULT = 'Dataportaal';

const documentHead = () => (next) => (action) => {
  const typeIsRoute = Object.keys(routing).map((key) => routing[key].type).includes(action.type);
  if (typeIsRoute) {
    const page = Object.keys(routing).find((key) => routing[key].type === action.type);
    const pageType = get(routing, `[${page}].type`, '');
    let pageTitle = get(routing, `[${page}].title`, TITLE_DEFAULT);

    switch (pageType) {
      // eslint-disable-next-line no-case-declarations
      case routing.home.type:
        const view = get(action, 'meta.query.view', '');
        const embed = get(action, 'meta.query.embed', 'false');
        if (view === VIEWS.MAP) {
          pageTitle = 'Grote kaart';
          if (embed === 'true') {
            pageTitle = `${pageTitle} | Embeded`;
          }
        }
        break;
      // eslint-disable-next-line no-case-declarations
      case routing.dataDetail.type:
        pageTitle = getTitle(action.payload);
        break;
      default:
        break;
    }

    document.title = `${pageTitle} - ${TITLE_SUFFIX}`;
  }
  return next(action);
};

export default documentHead;
