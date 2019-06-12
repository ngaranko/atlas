import React from 'react';
import { Menu, MenuItem, SubMenu } from '@datapunt/asc-ui';
import PropTypes from 'prop-types';

const HeaderMenu = ({
  toMap,
  toPanorama,
  login,
  logout,
  user,
  toMapLink,
  toPanoramaLink,
  toDatasets,
  toDatasetsLink,
  toApisLink,
  toApis,
  toPrivacyLink,
  toPrivacy,
  toAvailability,
  toAvailabilityLink,
  toMaintenanceLink,
  toMaintenance,
  toHelp,
  toHelpLink,
  showFeedbackForm,
  ...props
}) => (
  <Menu {...props}>
    <SubMenu label="Onderdelen">
      <MenuItem role="link" href={toMapLink} onClick={toMap}>
        Kaart
      </MenuItem>
      <MenuItem role="link" href={toPanoramaLink} onClick={toPanorama}>Panoramabeelden</MenuItem>
      <MenuItem role="link" href={toDatasetsLink} onClick={toDatasets}>Datasets</MenuItem>
      <MenuItem role="link" href={toApisLink} onClick={toApis}>Api&apos;s services</MenuItem>
    </SubMenu>
    <SubMenu label="Over">
      <MenuItem
        role="link"
        href={toPrivacyLink}
        onClick={toPrivacy}
      >
        Privacy en informatiebeveiliging
      </MenuItem>
      <MenuItem
        role="link"
        href={toAvailabilityLink}
        onClick={toAvailability}
      >
        Beschikbaarheid en kwaliteit data
      </MenuItem>
      <MenuItem
        role="link"
        href={toMaintenanceLink}
        onClick={toMaintenance}
      >
        Technisch beheer en werkwijze
      </MenuItem>
      <MenuItem role="link" href="mailto:datapunt@amsterdam.nl">Contact</MenuItem>
    </SubMenu>
    <MenuItem role="link" onClick={showFeedbackForm}>Feedback</MenuItem>
    <MenuItem role="link" href={toHelpLink} onClick={toHelp}>Help</MenuItem>

    {!user.authenticated ?
      <MenuItem onClick={login}>Inloggen</MenuItem> :
      <SubMenu label={user.name}>
        <MenuItem onClick={logout}>Uitloggen</MenuItem>
      </SubMenu>
    }
  </Menu>
);

HeaderMenu.propTypes = {
  toAvailabilityLink: PropTypes.string.isRequired,
  toPrivacyLink: PropTypes.string.isRequired,
  toMaintenanceLink: PropTypes.string.isRequired,
  toDatasetsLink: PropTypes.string.isRequired,
  toApisLink: PropTypes.string.isRequired,
  toMapLink: PropTypes.string.isRequired,
  toPanoramaLink: PropTypes.string.isRequired,
  toMap: PropTypes.func.isRequired,
  toDatasets: PropTypes.func.isRequired,
  toPrivacy: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  toAvailability: PropTypes.func.isRequired,
  toApis: PropTypes.func.isRequired,
  toMaintenance: PropTypes.func.isRequired,
  toPanorama: PropTypes.func.isRequired,
  toHelpLink: PropTypes.string.isRequired,
  toHelp: PropTypes.func.isRequired,
  showFeedbackForm: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired
};

export default HeaderMenu;
