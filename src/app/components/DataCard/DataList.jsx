import styled from '@datapunt/asc-core'
import { Icon, Link, themeSpacing, breakpoint } from '@datapunt/asc-ui'
import React from 'react'
import RouterLink from 'redux-first-router-link'
import { toDataSearchType, toDetailFromEndpoint } from '../../../store/redux-first-router/actions'
import SearchLink from '../Links/SearchLink/SearchLink'
import SearchHeading from '../SearchHeading/SearchHeading'
import DataIcon from './DataIcon'
import { VIEW_MODE } from '../../../shared/ducks/ui/ui'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { DEFAULT_LOCALE } from '../../../shared/config/locale.config'

const List = styled.ul`
  margin-bottom: ${({ hasMarginBottom }) => hasMarginBottom && themeSpacing(6)};
`

const StyledLink = styled(Link)`
  margin: ${themeSpacing(2, 0)};

  :last-child {
    margin-bottom: 0;
  }
`

const StyledIcon = styled(Icon)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${themeSpacing(1)};

  & svg {
    width: 40px;
    height: 40px;
  }
`
const StyledErrorMessage = styled(ErrorMessage)`
  @media screen and ${breakpoint('min-width', 'mobileL')} {
    width: 50%;
  }
`

const DataList = ({ type, label, count, results, withPagination }) => (
  <div>
    <SearchHeading
      label={`${label} (${count.toLocaleString(DEFAULT_LOCALE)})`}
      icon={
        <StyledIcon>
          <DataIcon type={type} />
        </StyledIcon>
      }
    />

    {results ? (
      <List hasMarginBottom={!withPagination}>
        {results.map(location => (
          <li key={location.id}>
            <StyledLink
              to={toDetailFromEndpoint(location.endpoint, VIEW_MODE.SPLIT)}
              forwardedAs={RouterLink}
              variant="with-chevron"
            >
              {location.label}
            </StyledLink>
          </li>
        ))}
      </List>
    ) : (
      <StyledErrorMessage />
    )}
    {!withPagination && results && count > results.length && (
      <SearchLink
        to={toDataSearchType(type)}
        label={`Alle ${label && label.toLowerCase()} tonen`}
      />
    )}
  </div>
)

export default DataList
