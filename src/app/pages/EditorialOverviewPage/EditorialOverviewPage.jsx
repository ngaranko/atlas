import React from 'react'
import styled from '@datapunt/asc-core'
import {
  CardContainer,
  Container,
  Column,
  Heading,
  Row,
  color,
  ascDefaultTheme,
} from '@datapunt/asc-ui'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import PAGES from '../../pages'
import EditorialCard from '../../components/EditorialCard'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import useFromCMS from '../../utils/useFromCMS'
import cmsConfig from '../../../shared/services/cms/cms-config'
import Footer from '../../components/Footer/Footer'
import {
  toPublicationDetail,
  toArticleDetail,
  toSpecialDetail,
} from '../../../store/redux-first-router/actions'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'

import './EditorialOverviewPage.scss'

const title = {
  [PAGES.ARTICLES]: 'Artikelen',
  [PAGES.PUBLICATIONS]: 'Publicaties',
  [PAGES.SPECIALS]: 'Specials',
}

const toDetailPage = {
  [PAGES.ARTICLES]: toArticleDetail,
  [PAGES.PUBLICATIONS]: toPublicationDetail,
  [PAGES.SPECIALS]: toSpecialDetail,
}

const PageHeading = styled(Heading)`
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid
    ${color('tint', 'level3')({
      theme: ascDefaultTheme,
    })};
`

const EditorialCardContainer = styled(CardContainer)`
  padding: 0;
`

const EditorialOverviewPage = ({ type = '' }) => {
  const { results, fetchData, loading } = useFromCMS(cmsConfig[type])
  const { data, links } = results || {}
  const [aggregatedData, setData] = React.useState([])
  const [page, setPage] = React.useState(0)

  React.useEffect(() => {
    if (type) {
      fetchData()
    }
  }, [type])

  React.useEffect(() => {
    if (data) {
      setData([...aggregatedData, ...data])
      setPage(page + 1)
    }
  }, [data])

  return (
    <Container className="editorial-overview" beamColor="valid">
      <Row>
        <ContentContainer>
          <Column span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 12 }}>
            {page === 0 && loading ? (
              <LoadingIndicator />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <PageHeading $as="h1">{title[type]}</PageHeading>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <EditorialCardContainer>
                    {aggregatedData.length &&
                      aggregatedData.map(dataItem => {
                        const { href } = linkAttributesFromAction(
                          dataItem.field_special_type
                            ? toDetailPage[type](
                                dataItem.id,
                                dataItem.field_special_type,
                                dataItem.field_slug,
                              )
                            : toDetailPage[type](dataItem.id, dataItem.field_slug),
                        )

                        return <EditorialCard key={dataItem.id} dataItem={dataItem} href={href} />
                      })}

                    {page > 0 && loading && <LoadingIndicator />}

                    {links && links.next && (
                      <button
                        type="button"
                        className="c-show-more c-show-more--gray qa-show-more"
                        onClick={() => {
                          fetchData(links.next.href)
                        }}
                        tabIndex="0"
                      >
                        Toon meer
                      </button>
                    )}
                  </EditorialCardContainer>
                </div>
              </div>
            )}
          </Column>
        </ContentContainer>
      </Row>
      <Footer noMaxWidth />
    </Container>
  )
}

export default EditorialOverviewPage
