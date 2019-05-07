import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReactComponent as Facebook } from '@datapunt/asc-assets/lib/Icons/Facebook.svg';
import { ReactComponent as Twitter } from '@datapunt/asc-assets/lib/Icons/Twitter.svg';
import { ReactComponent as Linkedin } from '@datapunt/asc-assets/lib/Icons/Linkedin.svg';
import { ReactComponent as Email } from '@datapunt/asc-assets/lib/Icons/Email.svg';
import { ReactComponent as Print } from '@datapunt/asc-assets/lib/Icons/Print.svg';
import { ShareBar as ShareBarComponent, ShareButton } from '@datapunt/asc-ui';
import { hasPrintMode, showPrintMode, sharePage } from '../../../shared/ducks/ui/ui';
import getShareUrl from '../../../shared/services/share-url/share-url';

const ShareBar = ({
  hasPrintButton,
  openSharePage,
  openPrintMode
}) => {
  const handlePageShare = (target) => {
    openSharePage(target);

    const link = getShareUrl(target, window);
    window.open(link.url, link.target);
  };

  return (
    <ShareBarComponent>
      <ShareButton
        onClick={() => handlePageShare('facebook')}
        hoverColor="#3b5999"
        iconSize={30}
      >
        <Facebook />
      </ShareButton>
      <ShareButton
        onClick={() => handlePageShare('twitter')}
        hoverColor="#55acee"
      >
        <Twitter />
      </ShareButton>
      <ShareButton
        onClick={() => handlePageShare('linkedin')}
        hoverColor="#0077B5"
      >
        <Linkedin />
      </ShareButton>
      <ShareButton
        onClick={() => handlePageShare('email')}
      >
        <Email />
      </ShareButton>
      {
        hasPrintButton && (
          <ShareButton onClick={openPrintMode}>
            <Print />
          </ShareButton>
        )
      }
    </ShareBarComponent>
  );
};

ShareBar.defaultProps = {
  hasPrintButton: false
};

ShareBar.propTypes = {
  hasPrintButton: PropTypes.bool,
  openSharePage: PropTypes.func.isRequired,
  openPrintMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  hasPrintButton: hasPrintMode(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  openSharePage: sharePage,
  openPrintMode: showPrintMode
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShareBar);
