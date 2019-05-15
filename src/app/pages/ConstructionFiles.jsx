import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getByUrl } from '../../shared/services/api/api';
import { setCurrentFile } from '../../shared/ducks/files/actions';
import { getFileName } from '../../shared/ducks/files/selectors';
import Thumbnail from '../components/Thumbnail/Thumbnail';
import './Files.scss';

const ImageViewer = React.lazy(() => import('../components/ImageViewer/ImageViewer'));

const ConstructionFiles = ({ setFileName, fileName }) => {
  const [results, setResults] = React.useState([]);

  async function fetchConstructionFiles() {
    try {
      const data = await getByUrl('https://acc.api.data.amsterdam.nl/stadsarchief/bouwdossier/?dossiernr=12338');
      console.log(data);
      setResults(data.results);
    } catch (e) {
      console.log('Show warning!');
    }
  }

  React.useEffect(() => {
    fetchConstructionFiles();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {fileName && <ImageViewer {...{ fileName, results }} />}
      {!fileName && results && results.map(({ id, titel, subdossiers }) => (
        <div key={id}>
          <h3>{titel}</h3>
          {subdossiers.length &&
          <div>
            {subdossiers.map(({ bestanden, titel: subdossierTitle }) => (
              // eslint-disable-next-line react/no-array-index-key
              <div>
                <h4>{subdossierTitle}</h4>
                {bestanden &&
                <ul className="files">
                  {bestanden.map((file) => (
                    <li className="files-item">
                      <button
                        onClick={() => {
                          setFileName(encodeURIComponent(file.match(/SA(.*)/g)));
                        }}
                      >
                        <Thumbnail
                          src={`https://acc.images.data.amsterdam.nl/iiif/2/edepot:${encodeURIComponent(file.match(/SA(.*)/g))}/square/500,500/0/default.jpg`}
                          title="De titel!"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
                }
              </div>
            ))}
          </div>
          }
        </div>
      ))}

    </div>
  );
};

const mapStateToProps = (state) => ({
  fileName: getFileName(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setFileName: setCurrentFile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConstructionFiles);
