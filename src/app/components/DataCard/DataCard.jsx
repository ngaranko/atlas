import React from 'react'
import { Icon, Link, themeSpacing } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import RouterLink from 'redux-first-router-link'
import DataIcon from './DataIcon'
import SearchHeading from '../SearchHeading/SearchHeading'
import { toDataDetail } from '../../../store/redux-first-router/actions'

const StyledLink = styled(Link)`
  margin: ${themeSpacing(2, 0)};
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

const DataListCard = ({ type, label, results }) => (
  <div>
    <SearchHeading
      label={label}
      icon={
        <StyledIcon>
          <DataIcon type={type} />
        </StyledIcon>
      }
    />
    <ul>
      {results.map(location => (
        <li key={location.id}>
          <StyledLink
            to={toDataDetail([location.id, location.type, location.subtype])}
            $as={RouterLink}
            variant="with-chevron"
          >
            {location.label}
          </StyledLink>
        </li>
      ))}
    </ul>
  </div>
)

export default DataListCard
