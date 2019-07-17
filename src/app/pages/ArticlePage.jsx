import React from 'react'
import { Helmet } from 'react-helmet'
import {
  Article,
  Row,
  Column,
  BlogBody,
  BlogContent,
  BlogHeader,
  BlogMetaList,
  Summary,
  CustomHTMLBlock,
  BlogSidebar,
  LinkList,
  LinkListItem,
  Heading,
  Container,
} from '@datapunt/asc-ui'
import Footer from '../components/Footer/Footer'
import './ArticlePage.scss'
import SHARED_CONFIG from '../../shared/services/shared-config/shared-config'
import getReduxLinkProps from '../utils/getReduxLinkProps'
import { toArticle } from '../../store/redux-first-router/actions'
import { normalizeArticleData } from '../utils/normalizeFromCMS'
import LoadingIndicator from '../../shared/components/loading-indicator/LoadingIndicator'
import { routing } from '../routes'

/* istanbul ignore next */ const ArticlePage = ({ id }) => {
  const [articleData, setArticleData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(
      `${SHARED_CONFIG.CMS_ROOT}/jsonapi/node/article?filter[drupal_internal__nid]=${id}&include=field_image,field_downloads.field_publication_file`,
    )
      .then(response => response.json())
      .then(response => {
        // Unfortunately, we always get a 200, since we use the filter on drupal_internal__nid.
        // We couldn't find a way (yet) to get the uid of the article by slug.
        // That's why redirect to a 404 now if the data could not be normalized (eg. if one of the fields are not in the result)
        try {
          setLoading(false)
          setArticleData(normalizeArticleData(response))
        } catch (e) {
          window.location.replace(routing.niet_gevonden.path)
        }
      })
      .catch(() => {
        window.location.replace(routing.niet_gevonden.path)
      })
  }, [])

  const {
    image,
    title,
    date,
    localeDate,
    byline,
    intro,
    body,
    downloads,
    links,
    slug,
  } = articleData || {}
  const action = toArticle(id, slug)

  return !loading ? (
    <Container beamColor="valid">
      <div className="article">
        <Helmet>
          <link rel="canonical" href={getReduxLinkProps(action).href} />
        </Helmet>
        <Row className="article__row">
          <Article
            {...(image
              ? {
                  image: `${SHARED_CONFIG.CMS_ROOT}${image.uri.url}`,
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
                  <Column
                    span={{ small: 1, medium: 2, big: 4, large: 7, xLarge: 7 }}
                  >
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

export default ArticlePage
