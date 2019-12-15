import React from 'react'
import styled from '@datapunt/asc-core'
import { themeSpacing } from '@datapunt/asc-ui'
import { toDatasetDetail } from '../../../store/redux-first-router/actions'
import DatasetCard from '../../components/DatasetCard'
import useSlug from '../../utils/useSlug'
import { modificationDateFilter } from '../../components/Filters/Filters'

const StyledDatasetCard = styled(DatasetCard)`
  margin: ${themeSpacing(2, 0)};
`

export default ({ results }) =>
  results && results.length ? (
    <div>
      {results.map(({ header, id, description, modified, formats }) => (
        <StyledDatasetCard
          key={id}
          {...{
            to: toDatasetDetail({
              id,
              slug: useSlug(header) || '',
            }),
            shortTitle: header,
            teaser: description,
            lastModified: modificationDateFilter(modified),
            modified,
            formats,
          }}
        />
      ))}
    </div>
  ) : null
