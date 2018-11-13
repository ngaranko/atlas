import piwikTracker from '../../shared/services/piwik-tracker/piwik-tracker';

/** Set Piwik variable */
const actionsToPiwik = {
  TOGGLE_MAP_OVERLAY: (tracking) => [
    'trackEvent',
    'kaartlaag',
    tracking.category.toLowerCase().replace(/[: ][ ]*/g, '_'),
    tracking.title
  ],
  SET_MAP_BASE_LAYER: (tracking) => [
    'trackEvent',
    'achtergrond',
    (tracking.startsWith('lf') ? 'luchtfoto' : 'topografie'),
    tracking
  ],
  'datasetData/DOWNLOAD_DATASET_RESOURCE': (tracking) => [
    'trackEvent',
    'Download',
    tracking.dataset,
    tracking.resourceUrl
  ]
};

/** Execute Piwik actions */
const piwikMiddleware = () => (next) => (action) => {
  const nextAction = action;

  const actionMap = actionsToPiwik[action.type];

  if (actionMap) {
    const { tracking } = action.meta;
    piwikTracker(actionMap(tracking));
  }

  next(nextAction);
};

export default piwikMiddleware;
