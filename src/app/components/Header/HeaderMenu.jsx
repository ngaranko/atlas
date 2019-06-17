import React from 'react';
import { Menu, MenuItem, SubMenu } from '@datapunt/asc-ui';
import { ReactComponent as ChevronRight } from '@datapunt/asc-assets/lib/Icons/ChevronRight.svg';
import PropTypes from 'prop-types';
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
import getReduxLinkProps from '../../utils/getReduxLinkProps';

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

const HeaderMenu = ({
  login,
  logout,
  user,
  showFeedbackForm,
  ...props
}) => (
  <Menu {...props}>
    <SubMenu label="Onderdelen">
      <MenuItem
        title="Kaart"
        icon={<ChevronRight />}
        {...getReduxLinkProps(toMapAction)}
      >
        Kaart
      </MenuItem>
      <MenuItem
        title="Panoramabeelden"
        icon={<ChevronRight />}
        {...getReduxLinkProps(toPanoramaAction)}
      >
        Panoramabeelden
      </MenuItem>
      <MenuItem
        title="Datasets"
        icon={<ChevronRight />}
        {...getReduxLinkProps(toDatasetsAction)}
      >
        Datasets
      </MenuItem>
      <MenuItem
        title="Api's services"
        icon={<ChevronRight />}
        {...getReduxLinkProps(toApisAction)}
      >
        Api&apos;s services
      </MenuItem>
    </SubMenu>
    <SubMenu label="Over">
      <MenuItem
        title="Privacy en informatiebeveiliging"
        icon={<ChevronRight />}
        {...getReduxLinkProps(toPrivacyAction)}
      >
        Privacy en informatiebeveiliging
      </MenuItem>
      <MenuItem
        title="Beschikbaarheid en kwaliteit data"
        icon={<ChevronRight />}
        {...getReduxLinkProps(toAvailabilityAction)}
      >
        Beschikbaarheid en kwaliteit data
      </MenuItem>
      <MenuItem
        title="Technisch beheer en werkwijze"
        icon={<ChevronRight />}
        {...getReduxLinkProps(toMaintentanceAction)}
      >
        Technisch beheer en werkwijze
      </MenuItem>
      <MenuItem
        title="Contact"
        icon={<ChevronRight />}
        href="mailto:datapunt@amsterdam.nl"
      >
        Contact
      </MenuItem>
    </SubMenu>
    <MenuItem onClick={showFeedbackForm}>Feedback</MenuItem>
    <MenuItem {...getReduxLinkProps(toHelpAction)}>Help</MenuItem>

    {!user.authenticated ?
      <MenuItem onClick={login}>Inloggen</MenuItem> :
      <SubMenu label={user.name}>
        <MenuItem icon={<ChevronRight />} onClick={logout}>Uitloggen</MenuItem>
      </SubMenu>
    }
  </Menu>
);

HeaderMenu.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  showFeedbackForm: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired
};

export default HeaderMenu;
