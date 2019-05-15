import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContextMenuItem, Icon } from '@datapunt/asc-ui';
import { ReactComponent as FacebookPadded } from '@datapunt/asc-assets/lib/Icons/FacebookPadded.svg';
import { ReactComponent as Twitter } from '@datapunt/asc-assets/lib/Icons/Twitter.svg';
import { ReactComponent as Linkedin } from '@datapunt/asc-assets/lib/Icons/Linkedin.svg';
import { ReactComponent as Email } from '@datapunt/asc-assets/lib/Icons/Email.svg';
import getShareUrl from '../../../shared/services/share-url/share-url';
import { sharePage } from '../../../shared/ducks/ui/ui';

const ContextMenuSocialItems = ({ openSharePage }) => {
  const handlePageShare = (target) => {
    openSharePage(target);

    const link = getShareUrl(target, window);
    window.open(link.url, link.target);
  };

  return (
    <React.Fragment>
      <ContextMenuItem
        role="button"
        onClick={() => handlePageShare('facebook')}
        icon={
          <Icon inline size={24}>
            <FacebookPadded />
          </Icon>
        }
      >
        Deel via Facebook
      </ContextMenuItem>
      <ContextMenuItem
        role="button"
        onClick={() => handlePageShare('twitter')}
        icon={
          <Icon inline size={24} padding={4}>
            <Twitter />
          </Icon>
        }
      >
        Deel via Twitter
      </ContextMenuItem>
      <ContextMenuItem
        role="button"
        onClick={() => handlePageShare('linkedin')}
        icon={
          <Icon inline size={24} padding={4}>
            <Linkedin />
          </Icon>
        }
      >
        Deel via Linkedin
      </ContextMenuItem>
      <ContextMenuItem
        role="button"
        onClick={() => handlePageShare('email')}
        icon={
          <Icon inline size={24} padding={4}>
            <Email />
          </Icon>
        }
      >
        Deel via E-mail
      </ContextMenuItem>
    </React.Fragment>
  );
};

ContextMenuSocialItems.propTypes = {
  openSharePage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  openSharePage: sharePage
}, dispatch);

export default connect(null, mapDispatchToProps)(ContextMenuSocialItems);
