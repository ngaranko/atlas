import React from 'react'
import {
  Column,
  Paragraph,
  CustomHTMLBlock,
  EditorialContent,
  Heading,
  EditorialMetaList,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import ShareBar from '../../../components/ShareBar/ShareBar'
import Video from '../../../components/Video/Video'

const StyledColumn = styled(Column)`
  margin-bottom: ${themeSpacing(5)};
  align-self: flex-start;

  // The video tag is target through the column as the Video component is using a complex SASS setup, this can be changed if that component gets refactored in the future
  & video {
    max-width: 100%;
    border: 1px solid ${themeColor('tint', 'level3')};
  }
`

const Animation = ({ contentLink, title, results }) => {
  const { body, field_intro: intro, localeDateFormatted } = results

  return (
    <>
      <Column wrap span={{ small: 1, medium: 4, big: 6, large: 12, xLarge: 12 }}>
        <Column
          span={{
            small: 1,
            medium: 4,
            big: 6,
            large: 12,
            xLarge: 12,
          }}
        >
          <EditorialContent>
            <Heading>{title}</Heading>
            <EditorialMetaList fields={[{ id: 1, label: localeDateFormatted }]} />
          </EditorialContent>
        </Column>

        <StyledColumn span={{ small: 1, medium: 4, big: 3, large: 6, xLarge: 6 }}>
          {contentLink && contentLink.uri && (
            <Video
              src={contentLink.uri}
              type="video/mp4" // For now it's assumed the videos are always in MP4 format
              showControls
            />
          )}
        </StyledColumn>
        <Column span={{ small: 1, medium: 4, big: 3, large: 6, xLarge: 6 }}>
          <EditorialContent>
            {intro && <Paragraph strong>{intro}</Paragraph>}
            {body && <CustomHTMLBlock body={body} />}
          </EditorialContent>
        </Column>
      </Column>
      <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
        <ShareBar topSpacing={6} />
      </Column>
    </>
  )
}

export default Animation
