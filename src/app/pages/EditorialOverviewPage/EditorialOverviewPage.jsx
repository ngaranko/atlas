import React from 'react'
import styled from '@datapunt/asc-core'
import { Button, CardContainer, Container, Column, Heading, Row, color } from '@datapunt/asc-ui'
import { Enlarge } from '@datapunt/asc-assets'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import PAGES from '../../pages'
import EditorialCard from '../../components/EditorialCard'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import useFromCMS from '../../utils/useFromCMS'
import cmsConfig from '../../../shared/services/cms/cms-config'
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
  border-bottom: 1px solid ${color('tint', 'level3')};
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
    fetchData()
  }, [])

  React.useEffect(() => {
    if (data) {
      setData([...aggregatedData, ...data])
      setPage(page + 1)
    }
  }, [data])

  return (
    <Container className="editorial-overview" beamColor="valid">
      <div className="editorial-overview__body">
        <Row>
          <ContentContainer>
            <Column span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 12 }}>
              <EditorialCardContainer>
                {page === 0 && loading ? (
                  <LoadingIndicator style={{ position: 'inherit' }} />
                ) : (
                  <>
                    <PageHeading $as="h1">{title[type]}</PageHeading>

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

                        return (
                          <EditorialCard
                            // eslint-disable-next-line
                            key={dataItem.id}
                            dataItem={dataItem}
                            href={href}
                          />
                        )
                      })}

                    {page > 0 && loading && <LoadingIndicator />}

                    {links &&
                      links.next &&
                      (loading ? (
                        <LoadingIndicator style={{ position: 'inherit' }} />
                      ) : (
                        <Button
                          variant="primaryInverted"
                          iconLeft={<Enlarge />}
                          iconSize={12}
                          onClick={() => {
                            fetchData(links.next.href)
                          }}
                          tabIndex="0"
                        >
                          Toon meer
                        </Button>
                      ))}
                  </>
                )}
              </EditorialCardContainer>
            </Column>
          </ContentContainer>
        </Row>
      </div>
    </Container>
  )
}

export default EditorialOverviewPage
