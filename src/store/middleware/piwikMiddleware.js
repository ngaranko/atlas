import piwikTracker from '../../shared/services/piwik-tracker/piwik-tracker';
import { SET_MAP_BASE_LAYER, TOGGLE_MAP_OVERLAY } from '../../map/ducks/map/map';

/** Set Piwik variable */
const piwik = {
  TRACK_EVENT: 'trackEvent',
  actions: [
    {
      type: TOGGLE_MAP_OVERLAY,
      name: 'kaartlaag',
      event: (event) => event.toLowerCase().replace(/[: ][ ]*/g, '_')
    },
    {
      type: SET_MAP_BASE_LAYER,
      name: 'achtergrond',
      event: (event) => (event.startsWith('lf') ? 'luchtfoto' : 'topografie')
    }
  ]
};

/** Execute Piwik actions */
const piwikMiddleware = () => (next) => (action) => {
  const nextAction = action;

  if (piwik.actions.find((piwikAction) => (piwikAction.type === action.type))) {
    const { piwikPayload: payload } = action.meta;

    piwik.actions.map((piwikAction) =>
      (piwikAction.type === action.type) && piwikTracker([piwik.TRACK_EVENT, piwikAction.name,
        piwikAction.event(payload.event), payload.value])
    );
  }

  next(nextAction);
};

export default piwikMiddleware;
