import React from 'react';
import PropTypes from 'prop-types';
import FacebookPadded from '@datapunt/asc-assets/lib/Icons/FacebookPadded.svg';
import Twitter from '@datapunt/asc-assets/lib/Icons/Twitter.svg';
import Linkedin from '@datapunt/asc-assets/lib/Icons/Linkedin.svg';
import Email from '@datapunt/asc-assets/lib/Icons/Email.svg';
import Print from '@datapunt/asc-assets/lib/Icons/Print.svg';
import Ellipsis from '@datapunt/asc-assets/lib/Icons/Ellipsis.svg';
import { ContextMenu, ContextMenuItem, Icon } from '@datapunt/asc-ui';

import './ContextMenu.scss';

const ContextMenuComponent = ({
  isMapPanelVisible,
  handlePageShare,
  handlePrintMode,
  sharePage,
  showPrintMode
}) => (
  <section className={`context-menu ${isMapPanelVisible && 'context-menu--offset'}`}>
    <ContextMenu
      icon={
        <Icon padding={4} inline size={24}>
          <Ellipsis />
        </Icon>
      }
      position="bottom"
    >
      <ContextMenuItem
        role="button"
        divider
        onClick={() => handlePrintMode(showPrintMode)}
        icon={
          <Icon padding={4} inline size={24}>
            <Print />
          </Icon>
        }
      >
        Printen
      </ContextMenuItem>
      <ContextMenuItem
        role="button"
        onClick={() => handlePageShare('facebook', sharePage)}
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
        onClick={() => handlePageShare('twitter', sharePage)}
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
        onClick={() => handlePageShare('linkedin', sharePage)}
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
        onClick={() => handlePageShare('email', sharePage)}
        icon={
          <Icon inline size={24} padding={4}>
            <Email />
          </Icon>
        }
      >
        Deel via E-mail
      </ContextMenuItem>
    </ContextMenu>
  </section>
);

ContextMenuComponent.propTypes = {
  isMapPanelVisible: PropTypes.bool.isRequired,
  handlePageShare: PropTypes.func.isRequired,
  handlePrintMode: PropTypes.func.isRequired,
  sharePage: PropTypes.func.isRequired,
  showPrintMode: PropTypes.func.isRequired
};

export default ContextMenuComponent;
