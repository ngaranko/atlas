import React from 'react'
import PropTypes from 'prop-types'
import styled from '@datapunt/asc-core'
import { Card, CardMedia, Image, CardContent, themeSpacing } from '@datapunt/asc-ui'
import getState from '../../../shared/services/redux/get-state'

const StyledCardContent = styled(CardContent)`
  position: absolute;
  bottom: 0;
  padding: ${themeSpacing(2, 3)}
  min-height: inherit;
  background-color: rgba(255, 255, 255, .67);
`

const ConstructionFilesThumbnail = ({ src, title }) => {
  const [localImage, setLocalImage] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const { token } = getState().user

  React.useEffect(() => {
    async function fetchImage() {
      await fetch(src, {
        headers: {
          authorization: token || '',
        },
      })
        .then(response => {
          if (!response.ok) {
            setError(true)
          }

          return response.blob()
        })
        .then(images => {
          setLoading(false)

          // Then create a local URL for that image and print it
          return setLocalImage(URL.createObjectURL(images))
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    }

    fetchImage()
  }, [src])

  return (
    <Card isLoading={!!loading}>
      <CardMedia>
        {!loading && (
          <Image
            {...{
              src: !error ? localImage : '/assets/images/not_found_thumbnail.jpg',
              title,
              square: true,
            }}
          />
        )}
      </CardMedia>
      <StyledCardContent>{title}</StyledCardContent>
    </Card>
  )
}

ConstructionFilesThumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default ConstructionFilesThumbnail
