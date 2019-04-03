import React from 'react';
import PropTypes from 'prop-types';
import Facebook from '@datapunt/asc-assets/lib/Icons/Facebook.svg';
import Twitter from '@datapunt/asc-assets/lib/Icons/Twitter.svg';
import Linkedin from '@datapunt/asc-assets/lib/Icons/Linkedin.svg';
import Email from '@datapunt/asc-assets/lib/Icons/Email.svg';
import Print from '@datapunt/asc-assets/lib/Icons/Print.svg';
import { ShareBar, ShareButton } from '@datapunt/asc-ui';

const ShareBarComponent = ({
  handlePageShare,
  handlePrintMode,
  hasPrintButton,
  sharePage,
  showPrintMode
}) => (
  <ShareBar>
    <ShareButton
      onClick={() => handlePageShare('facebook', sharePage)}
      hoverColor="#3b5999"
      alignIcon="bottom"
      iconSize={24}
    >
      <Facebook />
    </ShareButton>
    <ShareButton
      onClick={() => handlePageShare('twitter', sharePage)}
      hoverColor="#55acee"
    >
      <Twitter />
    </ShareButton>
    <ShareButton
      onClick={() => handlePageShare('linkedin', sharePage)}
      hoverColor="#0077B5"
    >
      <Linkedin />
    </ShareButton>
    <ShareButton
      onClick={() => handlePageShare('email', sharePage)}
    >
      <Email />
    </ShareButton>
    {
      hasPrintButton && (
        <ShareButton onClick={() => handlePrintMode(showPrintMode)}>
          <Print />
        </ShareButton>
      )
    }
  </ShareBar>
);

ShareBarComponent.propTypes = {
  handlePageShare: PropTypes.func.isRequired,
  handlePrintMode: PropTypes.func.isRequired,
  hasPrintButton: PropTypes.bool.isRequired,
  sharePage: PropTypes.func.isRequired,
  showPrintMode: PropTypes.func.isRequired
};

export default ShareBarComponent;
