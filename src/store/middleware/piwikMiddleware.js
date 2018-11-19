import piwikTracker from '../../shared/services/piwik-tracker/piwik-tracker';

/** Set Piwik variable */
const actionsToPiwik = {
  TOGGLE_MAP_OVERLAY: (tracking) => [
    'trackEvent',
    'kaartlaag',
    (tracking.category) ? tracking.category.toLowerCase().replace(/[: ][ ]*/g, '_') : 'panorama',
    tracking.title
  ],
  SET_MAP_BASE_LAYER: (tracking) => [
    'trackEvent',
    'achtergrond',
    (tracking.startsWith('lf') ? 'luchtfoto' : 'topografie'),
    tracking
  ]
};

/** Execute Piwik actions */
const piwikMiddleware = () => (next) => (action) => {
  const nextAction = action;

  const actionMap = actionsToPiwik[action.type];

  if (actionMap) {
    const { tracking } = action.meta;

    if (tracking) {
      piwikTracker(actionMap(tracking));
    }
  }

  next(nextAction);
};

export default piwikMiddleware;
