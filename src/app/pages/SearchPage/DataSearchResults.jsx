import {
  Heading,
  Link,
  themeColor,
  themeSpacing,
  Card,
  CardContent,
  Paragraph,
  LinkList,
} from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import RouterLink from 'redux-first-router-link'
import React from 'react'
import { toDataDetail } from '../../../store/redux-first-router/actions'

const StyledLink = styled(Link)`
  margin: ${themeSpacing(2, 0)};
`

const StyledCard = styled(Card)`
  width: inherit;
  border: ${themeColor('tint', 'level3')} 1px solid;
`

const StyledHeading = styled(Heading)``

const StyledCardContent = styled(CardContent)`
  padding: ${themeSpacing(2)};
  min-height: inherit;
`

const StyledParagraph = styled(Paragraph)`
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
`

const StyledParagraphLink = styled(Link)`
  font-weight: normal;
  color: inherit;
`

export default ({ results }) => {
  if (results.length) {
    return results.map(result =>
      result.results && result.results.length ? (
        <StyledCard key={result.type} horizontal>
          <StyledCardContent>
            <div>
              <StyledHeading $as="h4">{`${result.label} (${result.count})`}</StyledHeading>
              {console.log(result)}
            </div>

            <div>
              <StyledParagraph>
                {result.results.map((location, index) => (
                  <>
                    <StyledParagraphLink
                      to={toDataDetail([location.id, 'bag', 'nummeraanduiding'])}
                      $as={RouterLink}
                    >
                      {location.label}
                    </StyledParagraphLink>
                    {index !== result.results.length - 1 ? `, ` : ''}
                  </>
                ))}
              </StyledParagraph>
            </div>
          </StyledCardContent>
        </StyledCard>
      ) : null,
    )
  }
  return null
}
