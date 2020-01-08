import React from 'react'
import styled from '@datapunt/asc-core'
import { themeSpacing } from '@datapunt/asc-ui'
import { Enlarge } from '@datapunt/asc-assets'
import { toDatasetDetail, toDatasets } from '../../../store/redux-first-router/actions'
import DatasetCard from '../../components/DatasetCard'
import useSlug from '../../utils/useSlug'
import redirectToDcatd from '../../utils/redirectToDcatd'
import { modificationDateFilter } from '../../components/Filters/Filters'
import NoSearchResults from '../../components/NoSearchResults'
import ActionButton from '../../components/ActionButton/ActionButton'
import getState from '../../../shared/services/redux/get-state'
import { dcatdScopes } from '../../../shared/services/auth/auth'

const DatasetCardContainer = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const StyledDatasetCard = styled(DatasetCard)`
  margin: ${themeSpacing(2, 0)};
`

const StyledActionButton = styled(ActionButton)`
  margin-bottom: ${themeSpacing(8)};
`

export default ({ query, label, results, isOverviewPage }) => {
  // Check if user has the correct scopes to add or edit datasets
  const canEdit =
    getState().user && isOverviewPage
      ? getState().user.scopes.some(scope => dcatdScopes.includes(scope))
      : false

  return results && results.length ? (
    <DatasetCardContainer>
      {canEdit && (
        <StyledActionButton
          data-test="ActionButton"
          onClick={() => redirectToDcatd('_')}
          label="Toevoegen"
          iconLeft={<Enlarge />}
        />
      )}

      {results.map(({ header, id, teaser, modified, distributionTypes }) => (
        <StyledDatasetCard
          data-test="DatasetCard"
          {...{
            key: id,
            to: toDatasetDetail({
              id,
              slug: useSlug(header) || '',
            }),
            shortTitle: header,
            teaser,
            lastModified: modificationDateFilter(modified),
            modified,
            distributionTypes,
          }}
        />
      ))}
    </DatasetCardContainer>
  ) : (
    <NoSearchResults query={query} label={label} to={toDatasets()} />
  )
}
