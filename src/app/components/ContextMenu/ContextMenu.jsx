import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReactComponent as FacebookPadded } from '@datapunt/asc-assets/lib/Icons/FacebookPadded.svg';
import { ReactComponent as Twitter } from '@datapunt/asc-assets/lib/Icons/Twitter.svg';
import { ReactComponent as Linkedin } from '@datapunt/asc-assets/lib/Icons/Linkedin.svg';
import { ReactComponent as Email } from '@datapunt/asc-assets/lib/Icons/Email.svg';
import { ReactComponent as Print } from '@datapunt/asc-assets/lib/Icons/Print.svg';
import { ReactComponent as Embed } from '@datapunt/asc-assets/lib/Icons/Embed.svg';
import { ReactComponent as Ellipsis } from '@datapunt/asc-assets/lib/Icons/Ellipsis.svg';
import { ReactComponent as ChevronDown } from '@datapunt/asc-assets/lib/Icons/ChevronDown.svg';
import { ContextMenu as ContextMenuComponent, ContextMenuItem, Icon } from '@datapunt/asc-ui';
import {
  hasEmbedMode,
  hasPrintMode,
  sharePage,
  showEmbedPreview,
  showPrintMode
} from '../../../shared/ducks/ui/ui';
import getShareUrl from '../../../shared/services/share-url/share-url';

import './ContextMenu.scss';

const ContextMenu = ({
  openSharePage,
  openPrintMode,
  openEmbedPreview,
  hasPrintButton,
  hasEmbedButton
}) => {
  const handlePageShare = (target) => {
    openSharePage(target);

    const link = getShareUrl(target, window);
    window.open(link.url, link.target);
  };

  return (
    <section className="context-menu qa-context-menu">
      <ContextMenuComponent
        alt="Actiemenu"
        arrowIcon={<ChevronDown />}
        icon={
          <Icon padding={4} inline size={24}>
            <Ellipsis />
          </Icon>
        }
        position="bottom"
      >
        {hasPrintButton ? <ContextMenuItem
          role="button"
          divider={!hasEmbedButton}
          onClick={openPrintMode}
          icon={
            <Icon padding={4} inline size={24}>
              <Print />
            </Icon>
          }
        >
          Printen
        </ContextMenuItem> : <></>}
        {hasEmbedButton ? <ContextMenuItem
          role="button"
          divider
          onClick={openEmbedPreview}
          icon={
            <Icon padding={4} inline size={24}>
              <Embed />
            </Icon>
          }
        >
          Embedden
        </ContextMenuItem> : <></>}
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
      </ContextMenuComponent>
    </section>
  );
};

ContextMenu.defaultProps = {
  hasPrintButton: false,
  hasEmbedButton: false
};

ContextMenu.propTypes = {
  hasPrintButton: PropTypes.bool,
  hasEmbedButton: PropTypes.bool,
  openSharePage: PropTypes.func.isRequired,
  openPrintMode: PropTypes.func.isRequired,
  openEmbedPreview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  hasPrintButton: hasPrintMode(state),
  hasEmbedButton: hasEmbedMode(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  openSharePage: sharePage,
  openPrintMode: showPrintMode,
  openEmbedPreview: showEmbedPreview
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
