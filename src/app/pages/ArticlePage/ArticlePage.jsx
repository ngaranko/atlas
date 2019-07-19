import {
  Article,
  BlogBody,
  BlogContent,
  BlogHeader,
  BlogMetaList,
  BlogSidebar,
  Column,
  Container,
  CustomHTMLBlock,
  Heading,
  LinkList,
  LinkListItem,
  Row,
  Summary,
} from '@datapunt/asc-ui'
import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import { toArticle } from '../../../store/redux-first-router/actions'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import Footer from '../../components/Footer/Footer'
import getReduxLinkProps from '../../utils/getReduxLinkProps'
import normalizeFromCMS from '../../utils/normalizeFromCMS'
import useDataFetching from '../../utils/useDataFetching'
import { routing } from '../../routes'
import './ArticlePage.scss'

/* istanbul ignore next */ const ArticlePage = ({ id, endpoint }) => {
  const [article, setArticle] = React.useState({})
  const { fetchData, results, loading } = useDataFetching()

  React.useEffect(() => {
    fetchData(endpoint)
  }, [])

  React.useEffect(() => {
    if (results) {
      try {
        const data = normalizeFromCMS(results, [
          'field_downloads',
          'field_links',
          'field_byline',
          'field_slug',
          'field_intro'
        ])
  
        setArticle(data)
      } catch(e) {
        window.location.replace(routing.niet_gevonden.path)
      }
    }
  }, [results])

  const {
    title,
    date,
    localeDate,
    body,
    coverUrl,
    field_downloads: downloads,
    field_links: links,
    field_byline: byline,
    field_slug: slug,
    field_intro: intro,
  } = article
  const action = toArticle(id, slug)
  const { href } = getReduxLinkProps(action)

  return !loading ? (
    <Container beamColor="valid">
      <div className="article">
        <Helmet>
          <link rel="canonical" href={href} />
        </Helmet>
        <Row className="article__row">
          <Article
            {...(coverUrl
              ? {
                  image: `${SHARED_CONFIG.CMS_ROOT}${coverUrl}`,
                }
              : {})}
          >
            <Row className="article__row">
              <BlogContent>
                <Column
                  wrap
                  span={{ small: 1, medium: 2, big: 5, large: 11, xLarge: 11 }}
                  push={{ small: 0, medium: 0, big: 1, large: 1, xLarge: 1 }}
                >
                  <Column span={{ small: 1, medium: 2, big: 4, large: 7, xLarge: 7 }}>
                    <BlogBody>
                      <BlogHeader title={title}>
                        <BlogMetaList
                          dateTime={date}
                          dateFormatted={localeDate}
                          fields={byline && [{ id: 1, label: byline }]}
                        />
                      </BlogHeader>
                      <Summary hasLongText>{intro}</Summary>
                      <CustomHTMLBlock body={body} />
                    </BlogBody>
                  </Column>
                  <Column
                    span={{ small: 1, medium: 2, big: 2, large: 3, xLarge: 3 }}
                    push={{ small: 0, medium: 0, big: 1, large: 1, xLarge: 1 }}
                  >
                    <BlogSidebar>
                      {downloads && downloads.length ? (
                        <>
                          <Heading as="h2">Downloads</Heading>
                          <LinkList>
                            {downloads.map(
                              ({
                                title: fileTitle,
                                drupal_internal__nid: key,
                                field_file_type: type,
                                field_file_size: size,
                                field_publication_file: file,
                              }) => (
                                <LinkListItem
                                  key={key}
                                  fileInfo={`${type} ${size}`}
                                  href={`${SHARED_CONFIG.CMS_ROOT}${file.uri.url}`}
                                >
                                  {fileTitle}
                                </LinkListItem>
                              ),
                            )}
                          </LinkList>
                        </>
                      ) : null}
                      {links && links.length ? (
                        <>
                          <Heading as="h2">Links</Heading>
                          <LinkList>
                            {links.map(({ uri, title: linkTitle }) => (
                              <LinkListItem key={uri} href={`${uri}`}>
                                {linkTitle}
                              </LinkListItem>
                            ))}
                          </LinkList>
                        </>
                      ) : null}
                    </BlogSidebar>
                  </Column>
                </Column>
              </BlogContent>
            </Row>
          </Article>
        </Row>
        <Footer />
      </div>
    </Container>
  ) : (
    <LoadingIndicator />
  )
}

const mapStateToProps = state => {
  const { id } = getLocationPayload(state)
  return {
    id,
    endpoint: `${
      SHARED_CONFIG.CMS_ROOT
    }jsonapi/node/article?filter[drupal_internal__nid]=${id}&include=field_cover_image.field_media_image,field_downloads.field_file`,
  }
}

export default connect(
  mapStateToProps,
  null,
)(ArticlePage)
