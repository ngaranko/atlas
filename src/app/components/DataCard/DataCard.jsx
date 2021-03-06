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
import { toDataSearchType, toDetailFromEndpoint } from '../../../store/redux-first-router/actions'
import DataIcon from './DataIcon'
import { VIEW_MODE } from '../../../shared/ducks/ui/ui'
import { DEFAULT_LOCALE } from '../../../shared/config/locale.config'

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

const ParagraphWrapper = styled.div`
  flex-wrap: nowrap;
  max-width: 800px;
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
        <Heading as="h4">
          <StyledLink
            forwardedAs={RouterLink}
            to={toDataSearchType(type)}
          >{`${label} (${count.toLocaleString(DEFAULT_LOCALE)})`}</StyledLink>
        </Heading>
      </div>

      <ParagraphWrapper>
        <StyledParagraph>
          {results.map(({ id, endpoint, label: itemLabel }, index) => (
            <React.Fragment key={id}>
              <StyledParagraphLink
                to={toDetailFromEndpoint(endpoint, VIEW_MODE.SPLIT)}
                forwardedAs={RouterLink}
              >
                {itemLabel}
              </StyledParagraphLink>
              {index !== results.length - 1 ? `, ` : ''}
            </React.Fragment>
          ))}
        </StyledParagraph>
      </ParagraphWrapper>
    </StyledCardContent>
  </StyledCard>
)

export default DataCard
