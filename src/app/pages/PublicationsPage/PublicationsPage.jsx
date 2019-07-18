import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import download from 'downloadjs'
import {
  Column,
  Row,
  Spinner,
  Publication,
  CustomHTMLBlock,
  Summary,
  BlogHeader,
  BlogMetaList,
  DocumentCover,
  BlogContent,
  Container,
} from '@datapunt/asc-ui'
// import Footer from '../../components/Footer/Footer'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import formatDate from '../../../shared/services/date-formatter/date-formatter'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import useDataFetching from '../../utils/useDataFetching'
import { toPublication } from '../../../store/redux-first-router/actions';
import getReduxLinkProps from '../../utils/getReduxLinkProps';

/* istanbul ignore next */
const PublicationsPage = ({ endpoint }) => {
  const { fetchData, results, loading } = useDataFetching()

  React.useEffect(() => {
    fetchData(endpoint)
  }, [])

  const {
    drupal_internal__nid: id,
    title,
    created,
    body,
    field_file_size: fileSize,
    field_file_type: fileType,
    field_publication_source: source,
    field_publication_intro: intro,
    field_slug: slug,
  } = results ? results.data[0].attributes : {}
  const coverUrl = results ? results.included[1].attributes.uri.url : {}
  const downloadUrl = results ? results.included[3].attributes.uri.url : {}

  const action = toPublication(id, slug)
  const { href } = getReduxLinkProps(action)

  return (
    <div className="c-dashboard__page o-max-width">
      <Container>
        <Helmet>
          <link rel="canonical" href={href} />
        </Helmet>

        {loading && (
          <div className="loading-indicator">
            <Spinner size={36} color="secondary" />
          </div>
        )}
        <Row>
          <Column wrap="true" span={{ small: 1, medium: 4, big: 6, large: 12, xLarge: 12 }}>
            {!loading && body && (
              <Publication>
                <Row>
                  <Column wrap span={{ small: 1, medium: 4, big: 6, large: 12, xLarge: 12 }}>
                    <Column
                      span={{
                        small: 1,
                        medium: 4,
                        big: 6,
                        large: 12,
                        xLarge: 12,
                      }}
                    >
                      <BlogContent>
                        <BlogHeader title={title} />
                        <BlogMetaList
                          fields={[
                            { id: 1, label: source },
                            { id: 4, label: formatDate(new Date(created)) },
                            { id: 2, label: fileSize },
                            { id: 3, label: fileType.toUpperCase() },
                          ]}
                        />
                      </BlogContent>
                    </Column>
                    <Column span={{ small: 1, medium: 4, big: 3, large: 6, xLarge: 6 }}>
                      <DocumentCover
                        imageSrc={`${SHARED_CONFIG.CMS_ROOT}${coverUrl}`}
                        description={`Download PDF (${fileSize})`}
                        onClick={() => {
                          const link = `${SHARED_CONFIG.CMS_ROOT}${downloadUrl}`
                          download(link)
                        }}
                      />
                    </Column>
                    <Column span={{ small: 1, medium: 4, big: 3, large: 6, xLarge: 6 }}>
                      <BlogContent>
                        {intro && <Summary>{intro}</Summary>}
                        <CustomHTMLBlock body={body.value} />
                      </BlogContent>
                    </Column>
                  </Column>
                </Row>
              </Publication>
            )}
          </Column>
        </Row>
      </Container>
      {/* {!loading && <Footer />} */}
    </div>
  )
}

const mapStateToProps = state => ({
  endpoint: `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/publication?filter[drupal_internal__nid]=${
    getLocationPayload(state).id
  }&include=field_cover_image.field_media_image,field_file.field_media_file`,
})

export default connect(
  mapStateToProps,
  null,
)(PublicationsPage)
