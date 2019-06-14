import React from 'react';
import { Menu, MenuItem, SubMenu } from '@datapunt/asc-ui';
import { ReactComponent as ChevronRight } from '@datapunt/asc-assets/lib/Icons/ChevronRight.svg';
import { ReactComponent as ChevronDown } from '@datapunt/asc-assets/lib/Icons/ChevronDown.svg';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';
import {
  toApisPage,
  toAvailabilityPage,
  toDatasets,
  toHelpPage,
  toMaintentancePage,
  toMapWithLegendOpen,
  toPanoramaAndPreserveQuery,
  toPrivacyPage
} from '../../../store/redux-first-router/actions';

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
        icon={<ChevronRight />}
        linkEl={Link}
        linkElProp={{
          to: toMapWithLegendOpen()
        }}
      >
        Kaart
      </MenuItem>
      <MenuItem
        icon={<ChevronRight />}
        linkEl={Link}
        linkElProp={{
          to: toPanoramaAndPreserveQuery(undefined, undefined, undefined, 'home')
        }}
      >
        Panoramabeelden
      </MenuItem>
      <MenuItem
        icon={<ChevronRight />}
        linkEl={Link}
        linkElProp={{
          to: toDatasets()
        }}
      >
        Datasets
      </MenuItem>
      <MenuItem
        icon={<ChevronRight />}
        linkEl={Link}
        linkElProp={{
          to: toApisPage()
        }}
      >
        Api&apos;s services
      </MenuItem>
    </SubMenu>
    <SubMenu label="Over">
      <MenuItem
        icon={<ChevronRight />}
        linkEl={Link}
        linkElProp={{
          to: toPrivacyPage()
        }}
      >
        Privacy en informatiebeveiliging
      </MenuItem>
      <MenuItem
        icon={<ChevronRight />}
        linkEl={Link}
        linkElProp={{
          to: toAvailabilityPage()
        }}
      >
        Beschikbaarheid en kwaliteit data
      </MenuItem>
      <MenuItem
        icon={<ChevronRight />}
        linkEl={Link}
        linkElProp={{
          to: toMaintentancePage()
        }}
      >
        Technisch beheer en werkwijze
      </MenuItem>
      <MenuItem
        icon={<ChevronRight />}
        href="mailto:datapunt@amsterdam.nl"
      >
        Contact
      </MenuItem>
    </SubMenu>
    <MenuItem
      onClick={(e) => {
        e.preventDefault();
        showFeedbackForm();
      }}
    >
      Feedback
    </MenuItem>
    <MenuItem
      linkEl={Link}
      linkElProp={{
        to: toHelpPage()
      }}
    >
      Help
    </MenuItem>

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
