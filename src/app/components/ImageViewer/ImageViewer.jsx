import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OpenSeadragon from 'openseadragon';
import PropTypes from 'prop-types';
import { IconButton } from '@datapunt/asc-ui';
import { ReactComponent as Close } from '@datapunt/asc-assets/lib/Icons/Close.svg';
import { ReactComponent as Enlarge } from '@datapunt/asc-assets/lib/Icons/Enlarge.svg';
import { ReactComponent as Minimise } from '@datapunt/asc-assets/lib/Icons/Minimise.svg';
import ViewerControls from '../ViewerControls/ViewerControls';
import { setCurrentFile } from '../../../shared/ducks/files/actions';
import './ImageViewer.scss';

const ImageViewer = ({ resetFileName, fileName, title, contextMenu }) => {
  const viewerRef = React.createRef();
  const [viewer, setViewerInstance] = React.useState(null);

  React.useEffect(() => {
    // Todo: retrieve the document title from the filename (filter)
    OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: 'http://openseadragon.github.io/openseadragon/images/',
      preserveViewport: true,
      visibilityRatio: 1,
      minZoomLevel: 1,
      defaultZoomLevel: 1,
      sequenceMode: true,
      showNavigationControl: false,
      showSequenceControl: false,
      tileSources: [`https://acc.images.data.amsterdam.nl/iiif/2/edepot:${fileName}/info.json`]
    }).addHandler('open', ({ eventSource }) => {
      setViewerInstance(eventSource);
    });
  }, []);

  const zoomIn = () => {
    viewer.viewport.zoomBy(1.5);
  };

  const zoomOut = () => {
    const targetZoomLevel = viewer.viewport.getZoom() - 1;
    const newZoomLevel = (targetZoomLevel < 1) ? 1 : targetZoomLevel;
    viewer.viewport.zoomTo(newZoomLevel);
  };

  return (
    <React.Fragment>
      <div ref={viewerRef} className="c-image-viewer" />
      {viewer &&
      <ViewerControls
        metaData={[title, fileName]}
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
              onClick={zoomIn}
            >
              <Enlarge />
            </IconButton>
            <IconButton
              size={32}
              iconSize={12}
              onClick={zoomOut}
            >
              <Minimise />
            </IconButton>
          </div>
        }
        bottomLeftComponent={
          contextMenu
        }
      />}
    </React.Fragment>
  );
};

ImageViewer.defaultProps = {
  fileName: '',
  title: '',
  contextMenu: null
};

ImageViewer.propTypes = {
  fileName: PropTypes.string.isRequired,
  title: PropTypes.string,
  resetFileName: PropTypes.func.isRequired,
  contextMenu: PropTypes.node
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resetFileName: () => setCurrentFile('')
}, dispatch);

export default connect(null, mapDispatchToProps)(ImageViewer);
