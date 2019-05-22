import React from 'react';
import { PropTypes } from 'prop-types';
import { Flex, FlexItem, FlexRow, Icon, Typography } from '@datapunt/asc-ui';
import { ReactComponent as Enlarge } from '@datapunt/asc-assets/lib/Icons/Enlarge.svg';
import { ReactComponent as Minimise } from '@datapunt/asc-assets/lib/Icons/Minimise.svg';
import Thumbnail from '../Thumbnail/Thumbnail';
import './Gallery.scss';

const Gallery = ({ title, thumbs, onClick }) => {
  const lessThumbnails = thumbs.slice(0, 6);
  const [thumbnails, setThumbnails] = React.useState(lessThumbnails);

  return (
    <Flex className="c-gallery" key={title}>
      <FlexRow flexDirection="column" gutterX={40}>
        <FlexItem>
          <Typography
            className="c-gallery__title"
            element="h3"
          >
            {title}
          </Typography>
          {thumbnails && thumbnails.length ?
            <Flex>
              <FlexRow
                as="ul"
                flexWrap="wrap"
                gutterY={15}
                gutterX={15}
                collapse
              >
                {thumbnails.map((file) => (
                  <FlexItem
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
                      `${100 / 4}%`,
                      `${100 / 6}%`
                    ]}
                    className="c-gallery__item"
                  >
                    <div className="c-gallery__square">
                      <button
                        className="c-gallery__thumbnail"
                        onClick={() => {
                          onClick(encodeURIComponent(file.match(/SA(.*)/g)));
                        }}
                      >
                        <Thumbnail
                          src={`https://acc.images.data.amsterdam.nl/iiif/2/edepot:${encodeURIComponent(file.match(/SA(.*)/g))}/square/500,500/0/default.jpg`}
                          title={encodeURIComponent(file.match(/SA(.*)/g))}
                          background="#ccc"
                        />
                      </button>
                    </div>
                  </FlexItem>
                ))}
              </FlexRow>
              {thumbs.length > 6 && ((thumbs.length !== thumbnails.length) ?
                <button
                  className="c-gallery__button"
                  onClick={() => setThumbnails(thumbs)}
                >
                  <Icon className="c-gallery__button-icon"><Enlarge /></Icon>Toon alle
                  ({thumbs.length})
                </button> :
                <button
                  className="c-gallery__button"
                  onClick={() => setThumbnails(lessThumbnails)}
                >
                  <Icon className="c-gallery__button-icon"><Minimise /></Icon>Minder tonen
                </button>)}
            </Flex>
            :
            <Typography element="em">Er zijn geen resultaten gevonden</Typography>
          }
        </FlexItem>
      </FlexRow>
    </Flex>
  );
};

Gallery.propTypes = {
  title: PropTypes.string.isRequired,
  thumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Gallery;
