import {
  Heading,
  Link,
  themeColor,
  themeSpacing,
  Icon,
  Card,
  CardContent,
  CardMedia,
  Paragraph,
} from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import RouterLink from 'redux-first-router-link'
import React from 'react'
import { toDataDetail } from '../../../store/redux-first-router/actions'
import DataIcon from './DataIcon'

const StyledLink = styled(Link)`
  cursor: pointer;
`

const StyledCard = styled(Card)`
  border: ${themeColor('tint', 'level3')} 1px solid;
  justify-content: flex-start;
  width: inherit;
`

const StyledCardContent = styled(CardContent)`
  padding: ${themeSpacing(2)};
  min-height: inherit;
  width: calc(100% - ${themeSpacing(19)});
`

const StyledCardMedia = styled(CardMedia)`
  max-width: ${themeSpacing(19)};
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

const StyledIcon = styled(Icon)`
  background: ${themeColor('tint', 'level2')};
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 60px;
    height: 60px;
  }
`

const DataCard = ({ type, label, count, results, ...otherProps }) => (
  <StyledCard key={type} horizontal {...otherProps}>
    <StyledCardMedia>
      <StyledIcon>
        <DataIcon type={type} />
      </StyledIcon>
    </StyledCardMedia>
    <StyledCardContent>
      <div>
        <Heading $as="h4">
          <StyledLink>{`${label} (${count})`}</StyledLink>
        </Heading>
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
