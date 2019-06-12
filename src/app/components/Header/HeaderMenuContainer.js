import { connect } from 'react-redux';
import { selectLocationState } from 'redux-first-router';
import toUrl from 'redux-first-router-link/dist/toUrl';
import HeaderMenu from './HeaderMenu';
import {
  toApisPage,
  toAvailabilityPage,
  toDatasets,
  toHelpPage,
  toMaintentancePage,
  toMap,
  toPanoramaAndPreserveQuery,
  toPrivacyPage
} from '../../../store/redux-first-router/actions';
import { authenticateRequest, getUser } from '../../../shared/ducks/user/user';

const toPanoramaAction = toPanoramaAndPreserveQuery(
  undefined, undefined, undefined, 'home'
);

const toMapAction = toMap(true);
const toDatasetsAction = toDatasets();
const toApisAction = toApisPage();
const toPrivacyAction = toPrivacyPage();
const toAvailabilityAction = toAvailabilityPage();
const toMaintentanceAction = toMaintentancePage();
const toHelpAction = toHelpPage();


const mapStateToProps = (state) => {
  const { routesMap } = selectLocationState(state);
  return {
    user: getUser(state),
    toMapLink: toUrl(toMapAction, routesMap),
    toPanoramaLink: toUrl(toPanoramaAction, routesMap),
    toDatasetsLink: toUrl(toDatasetsAction, routesMap),
    toApisLink: toUrl(toApisAction, routesMap),
    toPrivacyLink: toUrl(toPrivacyAction, routesMap),
    toAvailabilityLink: toUrl(toAvailabilityAction, routesMap),
    toMaintenanceLink: toUrl(toMaintentanceAction, routesMap),
    toHelpLink: toUrl(toHelpAction, routesMap)
  };
};

const mapDispatchToProps = (dispatch) => ({
  toMap: () => dispatch(toMap(true)),
  toPanorama: () => dispatch(toPanoramaAction),
  toDatasets: () => dispatch(toDatasetsAction),
  toApis: () => dispatch(toApisAction),
  toPrivacy: () => dispatch(toPrivacyAction),
  toAvailability: () => dispatch(toAvailabilityAction),
  toMaintenance: () => dispatch(toMaintentanceAction),
  toHelp: () => dispatch(toHelpAction),
  showFeedbackForm: () => {
    const openFeedbackFormEvent = new CustomEvent('openFeedbackForm');
    window.dispatchEvent(openFeedbackFormEvent);
  },
  login: () => {
    dispatch(authenticateRequest('inloggen'));
    window.auth.login();
  },
  logout: () => {
    dispatch(authenticateRequest('uitloggen'));
    window.auth.logout();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
