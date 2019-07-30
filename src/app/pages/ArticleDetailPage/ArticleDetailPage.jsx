import {
  Article,
  BlogBody,
  BlogContent,
  BlogHeader,
  BlogMetaList,
  BlogSidebar,
  Column,
  CustomHTMLBlock,
  Heading,
  LinkList,
  LinkListItem,
  Paragraph,
  Row,
} from '@datapunt/asc-ui'
import React from 'react'
import { connect } from 'react-redux'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import useFromCMS from '../../utils/useFromCMS'
import './ArticleDetailPage.scss'
import EditorialPage from '../../components/EditorialPage/EditorialPage'
import cmsConfig from '../../../shared/services/cms/cms-config'
import { toArticleDetail } from '../../../store/redux-first-router/actions'
import ContentContainer from '../../components/ContentContainer/ContentContainer'

/* istanbul ignore next */ const ArticleDetailPage = ({ id }) => {
  const { fetchData, results, loading } = useFromCMS()

  React.useEffect(() => {
    ;(async () => {
      await fetchData(id, cmsConfig.article)
    })()
  }, [])

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
  } = results || {}
  const documentTitle = `Artikel: ${title}`
  const linkAction = toArticleDetail(id, slug)

  return (
    <EditorialPage {...{ documentTitle, loading, linkAction }}>
      {!loading && (
        <div className="article">
          <Row className="article__row">
            <ContentContainer>
              <Article
                {...(coverUrl
                  ? {
                      image:
                        typeof coverUrl === 'string'
                          ? `${SHARED_CONFIG.CMS_ROOT}${coverUrl}`
                          : undefined,
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
                          <Paragraph strong hasLongText>
                            {intro}
                          </Paragraph>
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
            </ContentContainer>
          </Row>
        </div>
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
)(ArticleDetailPage)
