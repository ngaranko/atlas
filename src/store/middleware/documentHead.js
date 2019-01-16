import get from 'lodash.get';
import { routing } from '../../app/routes';
import { VIEWS } from '../../shared/ducks/data-search/constants';

const TITLE_SUFFIX = 'Dataportaal';
const TITLE_DEFAULT = 'Amsterdam';

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
          if (embed === 'false') {
            pageTitle = 'Grote kaart';
          } else {
            pageTitle = 'Grote kaart | Embeded ';
          }
        }
        break;
      // eslint-disable-next-line no-case-declarations
      case routing.dataDetail.type:
        const subtype = get(action, 'payload.subtype', 'onbekend');
        pageTitle = subtype;
        break;
      default:
        break;
    }

    document.title = `${pageTitle} - ${TITLE_SUFFIX}`;
  }
  return next(action);
};

export default documentHead;
