import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as Print } from '@datapunt/asc-assets/lib/Icons/Print.svg';
import { ReactComponent as Embed } from '@datapunt/asc-assets/lib/Icons/Embed.svg';
import { ReactComponent as Ellipsis } from '@datapunt/asc-assets/lib/Icons/Ellipsis.svg';
import { ReactComponent as ChevronDown } from '@datapunt/asc-assets/lib/Icons/ChevronDown.svg';
import {
  ContextMenu as ContextMenuComponent,
  ContextMenuItem,
  Icon
} from '@datapunt/asc-ui/lib/index';
import Container from '../Container';

import './Map.scss';
import socialItems from '../socialItems';

const Map = ({
  isMapPanelVisible,
  openSharePage,
  openPrintMode,
  openEmbedPreview,
  hasPrintButton,
  hasEmbedButton
}) => (
  <section className={`
        context-menu
        ${classNames({ 'context-menu--offset': isMapPanelVisible })}
      `}
  >
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
      {socialItems(openSharePage)}
    </ContextMenuComponent>
  </section>
);

Map.defaultProps = {
  hasPrintButton: false,
  hasEmbedButton: false
};

Map.propTypes = {
  hasPrintButton: PropTypes.bool,
  hasEmbedButton: PropTypes.bool,
  isMapPanelVisible: PropTypes.bool.isRequired,
  openSharePage: PropTypes.func.isRequired,
  openPrintMode: PropTypes.func.isRequired,
  openEmbedPreview: PropTypes.func.isRequired
};

export default Container(Map);
