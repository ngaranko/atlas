import React from 'react'
import { PropTypes } from 'prop-types'
import { GridContainer, GridItem, Icon, Heading } from '@datapunt/asc-ui'
import { Minimise, Enlarge } from '@datapunt/asc-assets'
import Thumbnail from '../Thumbnail/Thumbnail'
import getReduxLinkProps from '../../utils/getReduxLinkProps'
import { toConstructionFileViewer } from '../../../store/redux-first-router/actions'
import './Gallery.scss'

// Todo: replace the "encodeURIComponent(file.match(/SU(.*)/g)" when files are on the proper server
const Gallery = ({ title, allThumbnails, id, maxLength }) => {
  const lessThumbnails = allThumbnails.slice(0, maxLength)
  const [thumbnails, setThumbnails] = React.useState(lessThumbnails)

  return (
    <React.Fragment>
      <GridContainer className="c-gallery" key={title} direction="column" gutterX={20}>
        <GridItem>
          <Heading color="secondary" className="c-gallery__title" as="h3">
            {title} {allThumbnails.length > maxLength && `(${allThumbnails.length})`}
          </Heading>
          {thumbnails && thumbnails.length ? (
            <React.Fragment>
              <GridContainer as="ul" wrap="wrap" gutterY={7.5} gutterX={7.5} collapse>
                {thumbnails.map(file => (
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
                      `${100 / 6}%`,
                      `${100 / 6}%`,
                      '315px',
                    ]}
                    className="c-gallery__item"
                  >
                    <div className="c-gallery__square">
                      <a
                        title=""
                        {...getReduxLinkProps(
                          toConstructionFileViewer(id, encodeURIComponent(file)),
                        )}
                        className="c-gallery__thumbnail"
                      >
                        <Thumbnail
                          src={`https://acc.images.data.amsterdam.nl/iiif/2/edepot:${encodeURIComponent(
                            file,
                          )}/square/500,500/0/default.jpg`}
                          title={file.match(/[^/]*$/g)[0]}
                        />
                      </a>
                    </div>
                  </GridItem>
                ))}
              </GridContainer>
              {allThumbnails.length > maxLength &&
                (allThumbnails.length !== thumbnails.length ? (
                  <button
                    type="button"
                    className="c-gallery__button"
                    onClick={() => setThumbnails(allThumbnails)}
                  >
                    <Icon className="c-gallery__button-icon">
                      <Enlarge />
                    </Icon>
                    <div>Toon alle ({allThumbnails.length})</div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="c-gallery__button"
                    onClick={() => setThumbnails(lessThumbnails)}
                  >
                    <Icon className="c-gallery__button-icon">
                      <Minimise />
                    </Icon>
                    Minder tonen
                  </button>
                ))}
            </React.Fragment>
          ) : (
            <Heading as="em">Geen bouwtekening(en) beschikbaar.</Heading>
          )}
        </GridItem>
      </GridContainer>
    </React.Fragment>
  )
}

Gallery.defaultProps = {
  maxLength: 6,
}

Gallery.propTypes = {
  title: PropTypes.string.isRequired,
  allThumbnails: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
}

export default Gallery
