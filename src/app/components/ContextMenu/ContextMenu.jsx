import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReactComponent as Print } from '@datapunt/asc-assets/lib/Icons/Print.svg';
import { ReactComponent as Embed } from '@datapunt/asc-assets/lib/Icons/Embed.svg';
import { ReactComponent as Ellipsis } from '@datapunt/asc-assets/lib/Icons/Ellipsis.svg';
import { ReactComponent as ChevronDown } from '@datapunt/asc-assets/lib/Icons/ChevronDown.svg';
import { ContextMenu as ContextMenuComponent, ContextMenuItem, Icon } from '@datapunt/asc-ui';
import {
  hasEmbedMode,
  hasPrintMode,
  showEmbedPreview,
  showPrintMode
} from '../../../shared/ducks/ui/ui';
import { isMapPanelActive } from '../../../map/ducks/map/selectors';

import './ContextMenu.scss';
import ContextMenuSocialItems from './ContextMenuSocialItems';

const ContextMenu = ({
  isMapPanelVisible,
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
      <ContextMenuSocialItems />
    </ContextMenuComponent>
  </section>
);

ContextMenu.defaultProps = {
  hasPrintButton: false,
  hasEmbedButton: false
};

ContextMenu.propTypes = {
  hasPrintButton: PropTypes.bool,
  hasEmbedButton: PropTypes.bool,
  isMapPanelVisible: PropTypes.bool.isRequired,
  openPrintMode: PropTypes.func.isRequired,
  openEmbedPreview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isMapPanelVisible: isMapPanelActive(state),
  hasPrintButton: hasPrintMode(state),
  hasEmbedButton: hasEmbedMode(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  openPrintMode: showPrintMode,
  openEmbedPreview: showEmbedPreview
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
