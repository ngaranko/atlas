import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OpenSeadragon from 'openseadragon';
import { ContextMenu, ContextMenuItem, Icon, IconButton } from '@datapunt/asc-ui';
import { ReactComponent as Download } from '@datapunt/asc-assets/lib/Icons/Download.svg';
import { ReactComponent as ChevronDown } from '@datapunt/asc-assets/lib/Icons/ChevronDown.svg';
import { ReactComponent as Close } from '@datapunt/asc-assets/lib/Icons/Close.svg';
import { ReactComponent as Enlarge } from '@datapunt/asc-assets/lib/Icons/Enlarge.svg';
import { ReactComponent as Minimise } from '@datapunt/asc-assets/lib/Icons/Minimise.svg';
import { ReactComponent as Ellipsis } from '@datapunt/asc-assets/lib/Icons/Ellipsis.svg';
import ContextMenuSocialItems from '../ContextMenu/ContextMenuSocialItems';
import ViewerControls from '../ViewerControls/ViewerControls';
import { setCurrentFile } from '../../../shared/ducks/files/actions';

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);

    this.viewer = React.createRef();

    this.state = {
      viewer: null
    };

    this.zoomOut = this.zoomOut.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
  }

  componentDidMount() {
    const { fileName } = this.props;
    // Todo: retrieve the document title from the filename (filter)
    OpenSeadragon({
      element: this.viewer.current,
      prefixUrl: 'http://openseadragon.github.io/openseadragon/images/',
      preserveViewport: true,
      visibilityRatio: 1,
      minZoomLevel: 1,
      defaultZoomLevel: 1,
      sequenceMode: true,
      showNavigationControl: false,
      showSequenceControl: false,
      tileSources: [`https://acc.images.data.amsterdam.nl/iiif/2/edepot:${fileName}/info.json`]
    }).addHandler('open', ({ eventSource: viewer }) => {
      this.setState({
        viewer
      });
    });
  }

  zoomIn() {
    const { viewer } = this.state;
    viewer.viewport.zoomBy(1.5);
  }

  zoomOut() {
    const { viewer } = this.state;
    const targetZoomLevel = viewer.viewport.getZoom() - 1;
    const newZoomLevel = (targetZoomLevel < 1) ? 1 : targetZoomLevel;
    viewer.viewport.zoomTo(newZoomLevel);
  }

  render() {
    const { viewer } = this.state;
    const { resetFileName, fileName } = this.props;
    return (
      <React.Fragment>
        <div ref={this.viewer} style={{ width: '100%', height: '100%' }} />
        {viewer &&
        <ViewerControls
          metaData={['Egelantiersstraat 172, adm.nr.10693 (verbouwing, 1943)', fileName]}
          topRightComponent={
            <IconButton size={32} iconSize={15} onClick={resetFileName}>
              <Close />
            </IconButton>
          }
          bottomRightComponent={
            <div>
              <IconButton
                size={32}
                iconSize={12}
                onClick={this.zoomIn}
              >
                <Enlarge />
              </IconButton>
              <IconButton
                size={32}
                iconSize={12}
                onClick={this.zoomOut}
              >
                <Minimise />
              </IconButton>
            </div>
          }
          bottomLeftComponent={
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
                as="a"
                role="button"
                onClick={() => {
                  const link = document.createElement('a');
                  link.download = `${fileName}_small`;
                  link.target = '_blank';
                  link.href = `https://acc.images.data.amsterdam.nl/iiif/2/edepot:${fileName}/full/full/0/default.jpg`;
                  link.click();
                }}
                icon={
                  <Icon inline size={24} padding={4}>
                    <Download />
                  </Icon>
                }
              >
                Download klein
              </ContextMenuItem>
              <ContextMenuItem
                role="button"
                onClick={() => {

                }}
                icon={
                  <Icon inline size={24} padding={4}>
                    <Download />
                  </Icon>
                }
              >
                Download groot
              </ContextMenuItem>
              <ContextMenuItem
                role="button"
                divider
                onClick={() => {

                }}
                icon={
                  <Icon inline size={24} padding={4}>
                    <Download />
                  </Icon>
                }
              >
                Download origineel
              </ContextMenuItem>
              <ContextMenuSocialItems />
            </ContextMenu>
          }
        />}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resetFileName: () => setCurrentFile('')
}, dispatch);

export default connect(null, mapDispatchToProps)(ImageViewer);
