import React from 'react'
import styled from '@datapunt/asc-core'
import {
  Card,
  CardContent,
  Link,
  Heading,
  Paragraph,
  themeColor,
  themeSpacing,
} from '@datapunt/asc-ui'
import RouterLink from 'redux-first-router-link'
import focusOutline from '../shared/focusOutline'

const StyledHeading = styled(Heading)`
  border-bottom: 2px solid transparent;
  line-height: 22px;
  margin-bottom: ${themeSpacing(3)};
  width: fit-content;
  display: inline-block;
`

const StyledLink = styled(Link)`
  border-bottom: ${themeColor('tint', 'level3')} 1px solid;
  width: 100%;
  min-height: 66px;

  &:hover {
    border-bottom: ${themeColor('secondary')} 1px solid;

    ${StyledHeading} {
      color: ${themeColor('secondary')};
      border-color: ${themeColor('secondary')};
    }
  }

  &:focus {
    background: none;
    position: relative;

    ${focusOutline()}
  }
`

const StyledCard = styled(Card)`
  align-items: stretch;
`

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: ${themeSpacing(0, 4)};
  border-bottom: 1px solid ${themeColor('tint', 'level3')};
  position: relative;
`

const StyledParagraph = styled(Paragraph)`
  display: flex;
  padding-bottom: ${themeSpacing(4)};
`

const MetaText = styled(StyledParagraph)`
  color: ${themeColor('tint', 'level5')};
  font-size: 14px;
  line-height: 1.25;
`
const FormatTag = styled.span`
  padding: ${themeSpacing(0, 1)};
  color: ${themeColor('tint', 'level5')};
`

const DatasetCard = ({ id, shortTitle, teaser, lastModified, modified, formats, to }) => (
  <StyledLink $as={RouterLink} key={id} to={to} title={shortTitle} linkType="blank">
    <StyledCard horizontal>
      <StyledCardContent>
        <div>
          <StyledHeading $as="h4">{shortTitle}</StyledHeading>
        </div>

        <div>
          <MetaText as="time" data-test="metaText" datetime={modified}>
            {`Gewijzigd: ${lastModified}`}
          </MetaText>
        </div>

        <div>
          <StyledParagraph>{teaser}</StyledParagraph>
        </div>

        <div>
          <MetaText data-test="metaText">
            {`Formaten: `}
            {formats.length > 0 &&
              formats.map(format => (
                <FormatTag key={format.name} data-test="formatTag">
                  <strong>{format.name}</strong>
                  {` x ${format.count}`}
                </FormatTag>
              ))}
          </MetaText>
        </div>
      </StyledCardContent>
    </StyledCard>
  </StyledLink>
)

export default DatasetCard
