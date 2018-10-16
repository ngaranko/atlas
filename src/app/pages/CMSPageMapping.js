import PAGES from '../pages';

const PAGE_TEMPLATE = {
  home: 'home',
  contentDetail: 'content-detail',
  contentOverview: 'content-overzicht'
};

const PAGE_TYPES = {
  nieuws: 'news',
  help: 'help',
  proclaimer: 'proclaimer',
  bediening: 'snelwegwijs',
  gegevens: 'info',
  over_api: 'apis',
  beleid: 'beleid',
  statistieken: 'statistieken'
};

// Help > Bediening > Inloggen deeplink id
export const BEDIENINING_LOGIN_DEEPLINK = 'snelwegwijsitem9';

/**
 * Maps site page to CMS page variables
 */
export const CMS_PAGE_MAPPING = {
  [PAGES.HOME]: {
    template: PAGE_TEMPLATE.home
  },
  [PAGES.NIEUWS]: {
    template: PAGE_TEMPLATE.contentDetail,
    type: PAGE_TYPES.nieuws,
    item: 'item0'
  },
  [PAGES.HELP]: {
    template: PAGE_TEMPLATE.contentOverview,
    type: PAGE_TYPES.help
  },
  [PAGES.PROCLAIMER]: {
    template: PAGE_TEMPLATE.contentOverview,
    type: PAGE_TYPES.proclaimer
  },
  [PAGES.BEDIENING]: {
    template: PAGE_TEMPLATE.contentOverview,
    type: PAGE_TYPES.bediening
  },
  [PAGES.GEGEVENS]: {
    template: PAGE_TEMPLATE.contentOverview,
    type: PAGE_TYPES.gegevens
  },
  [PAGES.OVER_API]: {
    template: PAGE_TEMPLATE.contentOverview,
    type: PAGE_TYPES.over_api
  },
  [PAGES.PRIVACY_BEVEILIGING]: {
    template: PAGE_TEMPLATE.contentDetail,
    type: PAGE_TYPES.beleid,
    item: 'item0'
  },
  [PAGES.BESCHIKBAAR_KWALITEIT]: {
    template: PAGE_TEMPLATE.contentDetail,
    type: PAGE_TYPES.beleid,
    item: 'item1'
  },
  [PAGES.BEHEER_WERKWIJZE]: {
    template: PAGE_TEMPLATE.contentDetail,
    type: PAGE_TYPES.beleid,
    item: 'item2'
  },
  [PAGES.STATISTIEKEN]: {
    template: PAGE_TEMPLATE.contentOverview,
    type: PAGE_TYPES.statistieken
  }
};
