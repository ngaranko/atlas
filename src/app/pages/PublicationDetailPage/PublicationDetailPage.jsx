import React from 'react'
import { connect } from 'react-redux'
import fileSaver from 'file-saver'
import {
  Column,
  Row,
  CustomHTMLBlock,
  EditorialMetaList,
  EditorialContent,
  Paragraph,
  Heading,
} from '@datapunt/asc-ui'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import useFromCMS from '../../utils/useFromCMS'
import EditorialPage from '../../components/EditorialPage/EditorialPage'
import { cmsConfig } from '../../../shared/config/config'
import { toPublicationDetail } from '../../../store/redux-first-router/actions'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import { routing } from '../../routes'
import ShareBar from '../../components/ShareBar/ShareBar'
import getImageFromCms from '../../utils/getImageFromCms'
import DocumentCover from '../../components/DocumentCover/DocumentCover'

const PublicationDetailPage = ({ id }) => {
  const { fetchData, results, loading, error } = useFromCMS(cmsConfig.PUBLICATION, id)
  const [downloadLoading, setDownloadLoading] = React.useState(false)

  React.useEffect(() => {
    fetchData()
  }, [id])

  React.useEffect(() => {
    if (error) {
      window.location.replace(routing.niet_gevonden.path)
    }
  }, [error])

  const {
    title,
    localeDateFormatted,
    body,
    coverImage,
    field_file_size: fileSize,
    field_file_type: fileType,
    field_publication_source: source,
    field_intro: intro,
    field_slug: slug,
  } = results || {}

  const documentTitle = title && `Publicatie: ${title}`
  const linkAction = toPublicationDetail(id, slug)

  const downloadFile = fileUrl => {
    setDownloadLoading(true)

    const url = `${process.env.CMS_ROOT}${fileUrl && fileUrl.substring(1)}`
    const fileName = fileUrl.split('/').pop()

    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        fileSaver(blob, fileName)
        setDownloadLoading(false)
      })
  }

  return (
    <EditorialPage {...{ documentTitle, loading, linkAction }} description={intro}>
      {!loading && (
        <Column wrap="true" span={{ small: 1, medium: 4, big: 6, large: 12, xLarge: 12 }}>
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
                  <EditorialContent>
                    <Heading $as="h1">{title}</Heading>
                    <EditorialMetaList
                      fields={[
                        { id: 1, label: source },
                        { id: 4, label: localeDateFormatted },
                        { id: 2, label: fileSize },
                        { id: 3, label: fileType.toUpperCase() },
                      ]}
                    />
                  </EditorialContent>
                </Column>

                <Column span={{ small: 1, medium: 4, big: 3, large: 6, xLarge: 6 }}>
                  <DocumentCover
                    imageSrc={getImageFromCms(coverImage, 600, 0, 'fit')}
                    description={`Download PDF (${fileSize})`}
                    loading={downloadLoading}
                    title={title}
                    onClick={() => downloadFile(results.fileUrl)}
                  />
                </Column>
                <Column span={{ small: 1, medium: 4, big: 3, large: 6, xLarge: 6 }}>
                  <EditorialContent>
                    {intro && <Paragraph strong>{intro}</Paragraph>}
                    {body && <CustomHTMLBlock body={body} />}
                  </EditorialContent>
                </Column>
              </Column>
              <Column span={{ small: 1, medium: 2, big: 6, large: 12, xLarge: 12 }}>
                <ShareBar topSpacing={6} />
              </Column>
            </Row>
          </ContentContainer>
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
