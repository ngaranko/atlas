import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ChevronDown } from '@datapunt/asc-assets/lib/Icons/ChevronDown.svg';
import { ContextMenu, ContextMenuItem, Icon } from '@datapunt/asc-ui';
import { ReactComponent as Ellipsis } from '@datapunt/asc-assets/lib/Icons/Ellipsis.svg';
import { ReactComponent as Print } from '@datapunt/asc-assets/lib/Icons/Print.svg';
import { ReactComponent as Download } from '@datapunt/asc-assets/lib/Icons/Download.svg';
import Container from '../Container';
import socialItems from '../socialItems';

const ConstructionFiles = ({ openSharePage, fileName, openPrintMode }) => (
  <ContextMenu
    tabindex={0}
    alt="Actiemenu"
    arrowIcon={<ChevronDown />}
    icon={
      <Icon padding={4} inline size={24}>
        <Ellipsis />
      </Icon>
    }
    position="bottom"
  >
    <ContextMenuItem
      role="button"
      onClick={openPrintMode}
      icon={
        <Icon padding={4} inline size={24}>
          <Print />
        </Icon>
      }
    >
      Printen
    </ContextMenuItem>
    <ContextMenuItem
      as="a"
      role="button"
      download={`${fileName}_small`}
      target="_blank"
      href={`https://acc.images.data.amsterdam.nl/iiif/2/edepot:${fileName}/full/600/0/default.jpg`}
      icon={
        <Icon inline size={24} padding={4}>
          <Download />
        </Icon>
      }
    >
      Download klein
    </ContextMenuItem>
    <ContextMenuItem
      as="a"
      role="button"
      download={`${fileName}_large`}
      target="_blank"
      href={`https://acc.images.data.amsterdam.nl/iiif/2/edepot:${fileName}/full/1268/0/default.jpg`}
      icon={
        <Icon inline size={24} padding={4}>
          <Download />
        </Icon>
      }
    >
      Download groot
    </ContextMenuItem>
    <ContextMenuItem
      as="a"
      role="button"
      download={`${fileName}_original`}
      target="_blank"
      href={`https://acc.images.data.amsterdam.nl/iiif/2/edepot:${fileName}/full/full/0/default.jpg`}
      divider
      icon={
        <Icon inline size={24} padding={4}>
          <Download />
        </Icon>
      }
    >
      Download origineel
    </ContextMenuItem>
    {socialItems(openSharePage)}
  </ContextMenu>
);

ConstructionFiles.propTypes = {
  openSharePage: PropTypes.func.isRequired,
  openPrintMode: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired
};

export default Container(ConstructionFiles);
