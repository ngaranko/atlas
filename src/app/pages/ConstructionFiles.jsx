import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { GridContainer, GridItem, Typography } from '@datapunt/asc-ui';
import { setCurrentFile } from '../../shared/ducks/files/actions';
import { getFileName } from '../../shared/ducks/files/selectors';
import { getUser } from '../../shared/ducks/user/user';
import { SCOPES } from '../../shared/services/auth/auth';
import NotAuthorizedMessage from '../components/PanelMessages/NotAuthorizedMessage';
import SHARED_CONFIG from '../../shared/services/shared-config/shared-config';
import { getLocationPayload } from '../../store/redux-first-router/selectors';
import Gallery from '../components/Gallery/Gallery';
import LoadingIndicator from '../../shared/components/loading-indicator/LoadingIndicator';
import ErrorMessage from '../components/PanelMessages/ErrorMessage/ErrorMessage';
import { getByUrl } from '../../shared/services/api/api';
import './ConstructionFiles.scss';
import { ConstructionFiles as ContextMenu } from '../components/ContextMenu';
import useMatomo from '../utils/useMatomo';
import useDocumentTitle from '../utils/useDocumentTitle';

const ImageViewer = React.lazy(() => import('../components/ImageViewer/ImageViewer'));

const ERROR_MESSAGE = 'Er kunnen door een technische storing helaas geen bouwdossiers worden getoond. Probeer het later nog eens.';

const ConstructionFiles = ({ setFileName, fileName, user, endpoint }) => {
  const [results, setResults] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imageViewerActive, setImageViewerActive] = React.useState(false);

  const { trackPageView } = useMatomo();
  const { documentTitle, setDocumentTitle } = useDocumentTitle();

  const {
    titel: title,
    subdossiers,
    datering: date,
    dossier_type: fileType,
    dossiernr: fileNumber
  } = results || {};

  async function fetchConstructionFiles() {
    setLoading(true);
    try {
      const data = await getByUrl(endpoint);
      setResults(data);
    } catch (e) {
      setErrorMessage(ERROR_MESSAGE);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    fetchConstructionFiles();
  }, []);

  // Effect to update the documentTitle
  React.useEffect(() => {
    if (title) {
      setDocumentTitle(imageViewerActive && 'Bouwtekening', [title]);
    }
  }, [title, imageViewerActive]);

  // Track pageView when documentTitle changes
  React.useEffect(() => {
    if (title) {
      trackPageView(documentTitle);
    }
  }, [documentTitle]);

  React.useEffect(() => {
    setImageViewerActive(!!fileName);
  }, [fileName]);

  const withGrid = (children) => (
    <GridContainer direction="column" gutterX={20} gutterY={20}>
      <GridItem>
        {children}
      </GridItem>
    </GridContainer>
  );
  const noResultsTemplate = withGrid(
    <Typography element="em">Geen resultaten gevonden</Typography>
  );

  const notAuthorizedTemplate = withGrid(
    <NotAuthorizedMessage />
  );

  const loadingTemplate = withGrid(
    <LoadingIndicator />
  );

  const resultsTemplate = (
    <div className="c-construction-files">
      {withGrid(
        <React.Fragment>
          <Typography
            className="c-construction-files__title"
            element="h3"
          >
            Bouwdossier
          </Typography>
          <Typography element="h1">{title}</Typography>
        </React.Fragment>
      )}

      <div className="c-ds-table">
        <div className="c-ds-table__body">
          <div className="c-ds-table__row">
            <div className="c-ds-table__cell">
              <div className="qa-table-value">Datering</div>
            </div>
            <div className="c-ds-table__cell">
              <div className="qa-table-value">{date}</div>
            </div>
          </div>
          <div className="c-ds-table__row">
            <div className="c-ds-table__cell">
              <div className="qa-table-value">Type</div>
            </div>
            <div className="c-ds-table__cell">
              <div className="qa-table-value">{fileType}</div>
            </div>
          </div>
          <div className="c-ds-table__row">
            <div className="c-ds-table__cell">
              <div className="qa-table-value">Dossier nummer</div>
            </div>
            <div className="c-ds-table__cell">
              <div className="qa-table-value">{fileNumber}</div>
            </div>
          </div>
        </div>
      </div>

      {subdossiers &&
      subdossiers.length &&
      subdossiers.map(({ bestanden, titel: subdossierTitle }) => (
        <Gallery
          key={subdossierTitle}
          title={subdossierTitle}
          thumbs={bestanden}
          onClick={setFileName}
          max={6}
        />
      ))}
    </div>
  );

  return user.scopes.includes(SCOPES['BD/R'])
    ? errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : (
      <React.Fragment>
        {imageViewerActive &&
        <ImageViewer {...{ fileName, title }} contextMenu={<ContextMenu fileName={fileName} />} />}
        {loading && loadingTemplate}
        {(!loading && !fileName) && (results ? resultsTemplate : noResultsTemplate)}
      </React.Fragment>)
    : notAuthorizedTemplate;
};

ConstructionFiles.propTypes = {
  setFileName: PropTypes.func.isRequired,
  fileName: PropTypes.string,
  user: PropTypes.shape({}).isRequired,
  endpoint: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  fileName: getFileName(state),
  endpoint: `${SHARED_CONFIG.API_ROOT}stadsarchief/bouwdossier/${getLocationPayload(state).id.replace('id', '')}/`,
  user: getUser(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setFileName: setCurrentFile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConstructionFiles);
