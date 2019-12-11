import {
  Heading,
  Link,
  themeColor,
  themeSpacing,
  Card,
  CardContent,
  CardMedia,
  Icon,
  Paragraph,
} from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import { Download } from '@datapunt/asc-assets'
import RouterLink from 'redux-first-router-link'
import React from 'react'
import { toDataDetail } from '../../../store/redux-first-router/actions'

const StyledCard = styled(Card)`
  border: ${themeColor('tint', 'level3')} 1px solid;
  justify-content: flex-start;
  width: inherit;
  margin: ${themeSpacing(2, 0)};
`

const StyledHeading = styled(Heading)`
  cursor: pointer;
`

const StyledCardContent = styled(CardContent)`
  padding: ${themeSpacing(2)};
  min-height: inherit;
  width: calc(100% - ${themeSpacing(19)});
`

const StyledCardMedia = styled(CardMedia)`
  max-width: ${themeSpacing(19)};
`

const StyledIcon = styled(Icon)`
  background: ${themeColor('tint', 'level2')};
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const DataCard = ({ type, label, count, results, ...otherProps }) => (
  <StyledCard key={type} horizontal {...otherProps}>
    <StyledCardMedia>
      <StyledIcon>
        <Download />
      </StyledIcon>
    </StyledCardMedia>
    <StyledCardContent>
      <div>
        <StyledHeading $as="h4">
          <Link>{`${label} (${count})`}</Link>
        </StyledHeading>
      </div>

      <div>
        <StyledParagraph>
          {results.map((location, index) => (
            <>
              <StyledParagraphLink
                // TODO: return correct type and subtype from the api to construct this link
                to={toDataDetail([location.id, location.type, location.subtype])}
                $as={RouterLink}
              >
                {location.label}
              </StyledParagraphLink>
              {index !== results.length - 1 ? `, ` : ''}
            </>
          ))}
        </StyledParagraph>
      </div>
    </StyledCardContent>
  </StyledCard>
)

export default DataCard
