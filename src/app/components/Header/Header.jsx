import React from 'react';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';
import classNames from 'classnames';
import { Header as HeaderComponent, Menu, MenuItem, SubMenu } from '@datapunt/asc-ui';
import { hidePrintMode, hideEmbedMode } from '../../../shared/ducks/ui/ui';
import HeaderSearchContainer from '../../../header/containers/header-search/HeaderSearchContainer';

import './Header.scss';

const MenuContainer = () => (
  <Menu>
    <SubMenu label="Onderdelen">
      <MenuItem>Kaart</MenuItem>
      <MenuItem>Panoramabeelden</MenuItem>
      <MenuItem>Datasets</MenuItem>
      <MenuItem>Apis services</MenuItem>
    </SubMenu>
    <SubMenu label="Over">
      <MenuItem>Privacy en informatiebeveiliging</MenuItem>
      <MenuItem>Beschikbaarheid en kwaliteit data</MenuItem>
      <MenuItem>Technisch beheer en werkwijze</MenuItem>
      <MenuItem>Contact</MenuItem>
    </SubMenu>
    <MenuItem>Feedback</MenuItem>
    <MenuItem>Help</MenuItem>
  </Menu>
);

const Header = ({ homePage, printOrEmbedMode, printMode, embedPreviewMode, hasMaxWidth }) => {
  if (!printOrEmbedMode) {
    return (
      <section className="styled-header">
        <HeaderComponent
          tall={homePage}
          title="Data en informatie"
          homeLink="/"
          fullWidth={!homePage}
        >
          <HeaderSearchContainer />
          <MenuContainer />
        </HeaderComponent>
      </section>
    );
  }
  return (
    <div className={classNames({ 'u-fixed': !printMode && !embedPreviewMode })}>
      <div className={`c-dashboard__heading ${classNames({ 'o-max-width': hasMaxWidth })}`} >
        <div className={classNames({ 'o-max-width__inner': hasMaxWidth })}>
          {printMode &&
            <div className="qa-dashboard__print-header">
              <AngularWrapper
                moduleName={'dpHeaderWrapper'}
                component="dpPrintHeader"
                dependencies={['atlas']}
                bindings={{
                  closeAction: hidePrintMode()
                }}
              />
            </div>
          }

          {embedPreviewMode &&
            <div className="qa-dashboard__embed-header">
              <AngularWrapper
                moduleName={'dpHeaderWrapper'}
                component="dpEmbedHeader"
                dependencies={['atlas']}
                bindings={{
                  closeAction: hideEmbedMode()
                }}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  homePage: PropTypes.bool.isRequired,
  hasMaxWidth: PropTypes.bool.isRequired,
  printMode: PropTypes.bool.isRequired,
  embedPreviewMode: PropTypes.bool.isRequired,
  printOrEmbedMode: PropTypes.bool.isRequired
};

export default Header;
