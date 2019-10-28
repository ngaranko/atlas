import { Heading, Link, themeColor, themeSpacing } from '@datapunt/asc-ui'
import styled from '@datapunt/asc-core'
import RouterLink from 'redux-first-router-link'
import React from 'react'
import { toDataDetail } from '../../../store/redux-first-router/actions'

const Divider = styled.div`
  width: 200px;
  height: 3px;
  background-color: ${themeColor('secondary')};
  margin: ${themeSpacing(8, 0, 6)};
`

const StyledLink = styled(Link)`
  margin: ${themeSpacing(2, 0)};
`

/**
 * Todo: loading state
 * @param results
 * @returns {*}
 */

export default ({ results }) =>
  results.map(result =>
    result.results && result.results.length ? (
      <div key={result.type}>
        <Divider />
        <Heading $as="h2">{result.label}</Heading>
        <ul>
          {result.results.map(location => (
            <li key={location.id}>
              <StyledLink
                to={toDataDetail([location.id, 'bag', 'nummeraanduiding'])}
                $as={RouterLink}
                variant="with-chevron"
              >
                {location.label}
              </StyledLink>
            </li>
          ))}
        </ul>
      </div>
    ) : null,
  )
