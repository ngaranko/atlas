import React from 'react'
import { Icon, Heading, Link, themeColor, themeSpacing } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import RouterLink from 'redux-first-router-link'
import { DataIcon } from '.'

const Divider = styled.div`
  width: 200px;
  height: 3px;
  background-color: ${themeColor('support', 'valid')};
  margin-bottom: ${themeSpacing(4)};
`

const StyledLink = styled(Link)`
  margin: ${themeSpacing(2, 0)};
`

const StyledHeading = styled(Heading)`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${themeSpacing(6)};
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
    <Divider />
    <StyledHeading $as="h2">
      <StyledIcon>
        <DataIcon type={type} />
      </StyledIcon>
      {label}
    </StyledHeading>
    <ul>
      {results.map(location => (
        <li key={location.id}>
          <StyledLink to={{}} $as={RouterLink} variant="with-chevron">
            {location.label}
          </StyledLink>
        </li>
      ))}
    </ul>
  </div>
)

export default DataListCard
