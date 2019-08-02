import React from 'react'
import { connect } from 'react-redux'
import download from 'downloadjs'
import {
  Column,
  Row,
  CustomHTMLBlock,
  BlogHeader,
  BlogMetaList,
  DocumentCover,
  BlogContent,
  Paragraph,
} from '@datapunt/asc-ui'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import useFromCMS from '../../utils/useFromCMS'
import EditorialPage from '../../components/EditorialPage/EditorialPage'
import cmsConfig from '../../../shared/services/cms/cms-config'
import { toPublicationDetail } from '../../../store/redux-first-router/actions'
import ContentContainer from '../../components/ContentContainer/ContentContainer'

const PublicationDetailPage = ({ id }) => {
  const { results, loading } = useFromCMS(cmsConfig.PUBLICATION, id)

  const {
    title,
    localeDate,
    body,
    coverImageUrl,
    fileUrl,
    field_file_size: fileSize,
    field_file_type: fileType,
    field_publication_source: source,
    field_publication_intro: intro,
    field_slug: slug,
  } = results || {}

  const documentTitle = `Publicatie: ${title}`
  const linkAction = toPublicationDetail(id, slug)

  return (
    <EditorialPage {...{ documentTitle, loading, linkAction }}>
      {!loading && (
        <Column wrap="true" span={{ small: 1, medium: 4, big: 6, large: 12, xLarge: 12 }}>
          {!loading && body && (
            <ContentContainer>
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
                          { id: 4, label: localeDate },
                          { id: 2, label: fileSize },
                          { id: 3, label: fileType.toUpperCase() },
                        ]}
                      />
                    </BlogContent>
                  </Column>
                  <Column span={{ small: 1, medium: 4, big: 3, large: 6, xLarge: 6 }}>
                    <DocumentCover
                      imageSrc={`${SHARED_CONFIG.CMS_ROOT}${coverImageUrl}`}
                      description={`Download PDF (${fileSize})`}
                      onClick={() => {
                        download(`${SHARED_CONFIG.CMS_ROOT}${fileUrl}`)
                      }}
                    />
                  </Column>
                  <Column span={{ small: 1, medium: 4, big: 3, large: 6, xLarge: 6 }}>
                    <BlogContent>
                      {intro && (
                        <Paragraph hasLongText strong>
                          {intro}
                        </Paragraph>
                      )}
                      <CustomHTMLBlock body={body.value} />
                    </BlogContent>
                  </Column>
                </Column>
              </Row>
            </ContentContainer>
          )}
        </Column>
      )}
    </EditorialPage>
  )
}

const mapStateToProps = state => {
  const { id } = getLocationPayload(state)
  return {
    id,
  }
}

export default connect(
  mapStateToProps,
  null,
)(PublicationDetailPage)
