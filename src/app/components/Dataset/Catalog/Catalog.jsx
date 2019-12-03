/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'
import removeMd from 'remove-markdown'
import {
  aggregateFilter,
  modificationDateFilter,
  truncateHtmlAsTextFilter,
} from '../../Filters/Filters'
import useSlug from '../../../utils/useSlug'
import { toDatasetDetail } from '../../../../store/redux-first-router/actions'
import DatasetCard from '../../DatasetCard'

const arrayToObject = (array, keyField) =>
  array.reduce(
    (acc, item) => ({
      ...acc,
      [item[keyField]]: item.label,
    }),
    {},
  )

const Catalog = ({ content, catalogFilters }) => {
  if (!Object.keys(catalogFilters).length) {
    return false
  }

  const formatMap = arrayToObject(catalogFilters.formatTypes, 'id')
  const serviceMap = arrayToObject(catalogFilters.serviceTypes, 'id')
  const distributionMap = arrayToObject(catalogFilters.distributionTypes, 'id')

  const items = content.map(item => {
    const formats = item['dcat:distribution'].map(resource => {
      if (resource['ams:distributionType'] === 'file') {
        return formatMap[resource['dcat:mediaType']]
      }
      if (resource['ams:distributionType'] === 'api') {
        return serviceMap[resource['ams:serviceType']]
      }
      return distributionMap[resource['ams:distributionType']]
    })

    // Ideally we need to retrieve the slug from the API, but we convert this in the frontend for now
    const id = item['dct:identifier']
    const to = toDatasetDetail({
      id,
      slug: useSlug(item['dct:title']),
    })

    return {
      shortTitle: item['dct:title'],
      teaser: truncateHtmlAsTextFilter(removeMd(item['dct:description'])),
      modified: item['ams:sort_modified'],
      lastModified: modificationDateFilter(item['ams:sort_modified']),
      formats: aggregateFilter(formats),
      to,
      id,
    }
  })
  return (
    <div className="c-data-selection-catalog u-margin__bottom--4">
      {items.map(row => (
        <DatasetCard key={row.id} {...row} />
      ))}
    </div>
  )
}

Catalog.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  catalogFilters: PropTypes.shape({}).isRequired,
}

export default Catalog
