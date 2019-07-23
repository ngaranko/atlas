import React from 'react'
import { Container, Row, Spinner } from '@datapunt/asc-ui'
import { Helmet } from 'react-helmet'
import useDocumentTitle from '../../utils/useDocumentTitle'
import useMatomo from '../../utils/useMatomo'
import { toSpecial } from '../../../store/redux-first-router/actions'
import getReduxLinkProps from '../../utils/getReduxLinkProps'
import Footer from '../Footer/Footer'
import './BlogPage.scss'

const BlogPage = ({ children, id, title, slug, loading }) => {
  const { setDocumentTitle } = useDocumentTitle()
  const { trackPageView } = useMatomo()

  React.useEffect(
    /* istanbul ignore next */
    () => {
      if (title) {
        setDocumentTitle(title)
        trackPageView(title)
      }
    },
    [title],
  )

  const action = toSpecial(id, slug)
  const { href } = getReduxLinkProps(action)

  return (
    <Container className="blog-page" beamColor="valid">
      <Helmet>
        <link rel="canonical" href={href} />
      </Helmet>
      <div className="blog-page__body">
        <Row>
          {loading && (
            <div className="loading-indicator">
              <Spinner size={36} color="secondary" />
            </div>
          )}
          {children}
        </Row>
      </div>
      <Footer noMaxWidth />
    </Container>
  )
}

export default BlogPage
