import React from 'react'
import styled from '@datapunt/asc-core'
import { Card, CardMedia, Image, CardContent, themeSpacing } from '@datapunt/asc-ui'
import getState from '../../../shared/services/redux/get-state'

type Thumbnail = {
  src: string
  title: string
}

const StyledCardContent = styled(CardContent)`
  position: absolute;
  bottom: 0;
  padding: ${themeSpacing(2, 3)}
  min-height: inherit;
  background-color: rgba(255, 255, 255, .67);
`

const IIIFThumbnail = ({ src, title }: Thumbnail) => {
  const [localImage, setLocalImage] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const { accessToken } = getState().user

  React.useEffect(() => {
    async function fetchImage() {
      await fetch(src, {
        headers: {
          authorization: `Bearer ${accessToken || ''}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            setError(true)
            return null
          }

          return response.blob()
        })
        .then(images => {
          setLoading(false)

          // Then create a local URL for that image and pass it to the local state
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
    <Card data-testid="Card" isLoading={!!loading}>
      <CardMedia>
        {!loading && (
          <Image
            {...{
              'data-testid': 'Image',
              src: error ? '/assets/images/not_found_thumbnail.jpg' : localImage,
              title,
              square: true,
            }}
          />
        )}
      </CardMedia>
      <StyledCardContent data-testid="CardContent">{title}</StyledCardContent>
    </Card>
  )
}

export default IIIFThumbnail
