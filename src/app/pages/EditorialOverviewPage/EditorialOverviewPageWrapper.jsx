/* eslint-disable camelcase */
import React from 'react'
import { Container } from '@datapunt/asc-ui'
import Footer from '../../components/Footer/Footer'
import useFromCMS from '../../utils/useFromCMS'
import cmsConfig from '../../../shared/services/cms/cms.config'

import './EditorialOverviewPage.scss'
import EditorialOverviewPage from './EditorialOverviewPage'
import useNormalizedCMSResults from '../../../normalizations/cms/useNormalizedCMSResults'

const EditorialOverviewPageWrapper = ({ type = '' }) => {
  const { results, fetchData, loading } = useFromCMS(cmsConfig[type], undefined, false)
  const [aggregatedData, setData] = React.useState([])
  const [page, setPage] = React.useState(0)
  const { results: data, _links } = results || {}

  React.useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
  }, [])

  React.useEffect(() => {
    if (data) {
      setData([...aggregatedData, ...data])
      setPage(page + 1)
    }
  }, [data])

  const normalizedResults = useNormalizedCMSResults(aggregatedData, type)

  return (
    <Container className="editorial-overview" beamColor="valid">
      <EditorialOverviewPage
        {...{ type, page, loading, links: _links }}
        results={normalizedResults}
        onClickMore={fetchData}
      />
      <Footer />
    </Container>
  )
}

export default EditorialOverviewPageWrapper
