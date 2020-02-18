/* eslint-disable no-nested-ternary */
import React from 'react'
import { PropTypes } from 'prop-types'
import RouterLink from 'redux-first-router-link'
import styled from '@datapunt/asc-core'
import { GridContainer, GridItem, Heading, themeSpacing, themeColor, Link } from '@datapunt/asc-ui'
import { Minimise, Enlarge } from '@datapunt/asc-assets'
import { toConstructionFileViewer } from '../../../store/redux-first-router/actions'
import ActionButton from '../ActionButton/ActionButton'
import IIIFThumbnail from '../IIIFThumbnail/IIIFThumbnail'
import Notification from '../../../shared/components/notification/Notification'

const GalleryGridContainer = styled(GridContainer)`
border-bottom: 1px solid ${themeColor('tint', 'level3')}
  padding-bottom: ${themeSpacing(5)}
  padding-top: ${themeSpacing(10)}

`

const StyledHeading = styled(Heading)`
  margin-bottom: ${themeSpacing(3)};
`

const StyledGridContainer = styled(GridContainer)`
  margin-bottom: ${({ hasMarginBottom }) => (hasMarginBottom ? themeSpacing(8) : 0)};
`

const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
  position: relative;

  // To make the link square
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  & > * {
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

// Todo: replace the "encodeURIComponent(file.match(/SU(.*)/g)" when files are on the proper server
const Gallery = ({ title, allThumbnails, id, maxLength, access }) => {
  const lessThumbnails = allThumbnails.slice(0, maxLength)
  const [thumbnails, setThumbnails] = React.useState(lessThumbnails)

  const hasMore = allThumbnails.length > maxLength
  const restricted = access === 'RESTRICTED'

  return (
    <GalleryGridContainer key={title} direction="column" gutterX={20}>
      <GridItem>
        <StyledHeading color="secondary" $as="h3">
          {title} {hasMore && `(${allThumbnails.length})`}
        </StyledHeading>
        {restricted ? (
          <Notification type="warning">
            Deze bouwdossiers zijn alleen beschikbaar voor medewerkers/ketenpartners met extra
            bevoegdheden
          </Notification>
        ) : thumbnails && thumbnails.length ? (
          <>
            <StyledGridContainer
              as="ul"
              wrap="wrap"
              gutterY={7.5}
              gutterX={7.5}
              hasMarginBottom={hasMore}
              collapse
            >
              {thumbnails.map(file => {
                const fileTitle = file.match(/[^/]*$/g)[0]
                const fileName = file.replace(/\//g, '-') // Replace all forward slashes to create a filename that can be read by the server

                return (
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
                  >
                    <StyledLink
                      $as={RouterLink}
                      to={toConstructionFileViewer(id, fileName)}
                      title={fileTitle}
                    >
                      <IIIFThumbnail
                        src={`${process.env.IIIF_ROOT}iiif/2/edepot:${fileName}/square/500,500/0/default.jpg`}
                        title={fileTitle}
                      />
                    </StyledLink>
                  </GridItem>
                )
              })}
            </StyledGridContainer>
            {hasMore &&
              (allThumbnails.length !== thumbnails.length ? (
                <ActionButton
                  iconLeft={<Enlarge />}
                  onClick={() => setThumbnails(allThumbnails)}
                  label={`Toon alle (${allThumbnails.length})`}
                />
              ) : (
                <ActionButton
                  iconLeft={<Minimise />}
                  onClick={() => setThumbnails(lessThumbnails)}
                  label="Minder tonen"
                />
              ))}
          </>
        ) : (
          <Heading as="em">Geen bouwtekening(en) beschikbaar.</Heading>
        )}
      </GridItem>
    </GalleryGridContainer>
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
