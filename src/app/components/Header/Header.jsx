import React from 'react';
import PropTypes from 'prop-types';
import { AngularWrapper } from 'react-angular';
import classNames from 'classnames';
import HEADER_SIZE from '../../../header/services/header-size/header-size.constant';
import { hidePrintMode, hideEmbedMode } from '../../../shared/ducks/ui/ui';

import { Header as HeaderComponent } from '@datapunt/asc-ui'
import HeaderSearchContainer from '../../../header/containers/header-search/HeaderSearchContainer'

import './Header.scss';

const Header = ({ homePage, printOrEmbedMode, printMode, embedPreviewMode, hasMaxWidth, user }) => {
  if (!printOrEmbedMode) {
    return (
      <HeaderComponent
        tall={homePage}
        title="Data en informatie"
        homeLink="http://data.amsterdam.nl"
        fullWidth={!homePage}
      >
        <HeaderSearchContainer />
      </HeaderComponent>
    )
  } else {
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
    )
  }
}

Header.propTypes = {
  homePage: PropTypes.bool.isRequired,
  hasMaxWidth: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  printMode: PropTypes.bool.isRequired,
  embedPreviewMode: PropTypes.bool.isRequired,
  printOrEmbedMode: PropTypes.bool.isRequired,
  hasPrintButton: PropTypes.bool.isRequired,
  hasEmbedButton: PropTypes.bool.isRequired
};

export default Header;
