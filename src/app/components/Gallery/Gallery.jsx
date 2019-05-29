import React from 'react';
import { PropTypes } from 'prop-types';
import { GridContainer, GridItem, Icon, Typography } from '@datapunt/asc-ui';
import { ReactComponent as Enlarge } from '@datapunt/asc-assets/lib/Icons/Enlarge.svg';
import { ReactComponent as Minimise } from '@datapunt/asc-assets/lib/Icons/Minimise.svg';
import Thumbnail from '../Thumbnail/Thumbnail';
import './Gallery.scss';

// Todo: replace the "encodeURIComponent(file.match(/SU(.*)/g)" when files are on the proper server
const Gallery = ({ title, allThumbnails, onClick, maxLength }) => {
  const lessThumbnails = allThumbnails.slice(0, maxLength);
  const [thumbnails, setThumbnails] = React.useState(lessThumbnails);

  return (
    <React.Fragment>
      <GridContainer className="c-gallery" key={title} direction="column" gutterX={20}>
        <GridItem>
          <Typography
            className="c-gallery__title"
            element="h3"
          >
            {title} {(allThumbnails.length > maxLength) && `(${allThumbnails.length})`}
          </Typography>
          {thumbnails && thumbnails.length ?
            <React.Fragment>
              <GridContainer
                as="ul"
                wrap="wrap"
                gutterY={7.5}
                gutterX={7.5}
                collapse
              >
                {thumbnails.map((file) => (
                  <GridItem
                    key={file}
                    as="li"
                    square
                    width={[
                      '100%',
                      '100%',
                      '100%',
                      '50%',
                      '50%',
                      `${100 / 3}%`,
                      '300px'
                    ]}
                    className="c-gallery__item"
                  >
                    <div className="c-gallery__square">
                      <button
                        className="c-gallery__thumbnail"
                        onClick={() => {
                          onClick(encodeURIComponent(file.match(/SU(.*)/g)));
                        }}
                      >
                        <Thumbnail
                          src={`https://acc.images.data.amsterdam.nl/iiif/2/edepot:${encodeURIComponent(file.match(/SU(.*)/g))}/square/500,500/0/default.jpg`}
                          title={file.match(/[^/]*$/g)[0]}
                        />
                      </button>
                    </div>
                  </GridItem>
                ))}
              </GridContainer>
              {allThumbnails.length > maxLength && ((allThumbnails.length !== thumbnails.length) ?
                <button
                  className="c-gallery__button"
                  onClick={() => setThumbnails(allThumbnails)}
                >
                  <Icon className="c-gallery__button-icon"><Enlarge /></Icon>
                  <div>Toon alle ({allThumbnails.length})</div>
                </button> :
                <button
                  className="c-gallery__button"
                  onClick={() => setThumbnails(lessThumbnails)}
                >
                  <Icon className="c-gallery__button-icon"><Minimise /></Icon>
                  Minder tonen
                </button>)}
            </React.Fragment>
            :
            <Typography element="em">Geen bouwtekening(en) beschikbaar.</Typography>
          }
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};

Gallery.defaultProps = {
  maxLength: 6
};

Gallery.propTypes = {
  title: PropTypes.string.isRequired,
  allThumbnails: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  maxLength: PropTypes.number
};

export default Gallery;
