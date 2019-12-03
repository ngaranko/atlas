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
import focusOutline from '../HomePage/services/styles'

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
      text-decoration: underline;
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

const IntroText = styled(Paragraph)`
  padding-bottom: ${themeSpacing(4)};
`

const MetaText = styled(Paragraph)`
  display: inline-block;
  color: ${themeColor('tint', 'level5')};
  padding-bottom: ${themeSpacing(4)};
  font-size: 14px;
  line-height: 1.25;
  margin-top: auto;
  &::first-letter {
    text-transform: capitalize;
  }
`

const DatasetCard = ({
  id = ' 9',
  shortTitle = 'De Amsterdam Museum dataset ',
  teaser = 'De Amsterdam Museum dataset is een beschrijving van de meer dan 70.000 aan Amsterdam gerelateerde objecten die aanwezig zijn in de collectie van het Amsterdam Museum. De dataset is aangeboden als Linked Open Data via PURL urls.',
  date = '',
  dateLocale = 'Locale date',
}) => {
  const to = {}

  return (
    <StyledLink $as={RouterLink} key={id} to={to} title={shortTitle} linkType="blank">
      <StyledCard horizontal>
        <StyledCardContent>
          <div>
            <StyledHeading $as="h4">{shortTitle}</StyledHeading>
          </div>

          <div>
            <IntroText>{teaser}</IntroText>
          </div>

          <div>
            <MetaText as="time" data-test="metaText" datetime={date}>
              {dateLocale}
            </MetaText>
          </div>
        </StyledCardContent>
      </StyledCard>
    </StyledLink>
  )
}

export default DatasetCard
