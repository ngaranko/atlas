import React from 'react'
import styled from '@datapunt/asc-core'
import { themeSpacing } from '@datapunt/asc-ui'
import { toDatasetDetail } from '../../../store/redux-first-router/actions'
import DatasetCard from '../../components/DatasetCard'
import useSlug from '../../utils/useSlug'
import { modificationDateFilter } from '../../components/Filters/Filters'

const DatasetCardContainer = styled.div`
  margin-bottom: ${themeSpacing(8)};
`

const StyledDatasetCard = styled(DatasetCard)`
  margin: ${themeSpacing(2, 0)};
`

export default ({ results }) =>
  results && results.length ? (
    <DatasetCardContainer>
      {results.map(({ header, id, teaser, modified, distributionTypes }) => (
        <StyledDatasetCard
          key={id}
          {...{
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
  ) : null
