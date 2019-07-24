import React from 'react'
import { Container } from '@datapunt/asc-ui'
import { Helmet } from 'react-helmet'
import useDocumentTitle from '../../utils/useDocumentTitle'
import useMatomo from '../../utils/useMatomo'
import { toSpecial } from '../../../store/redux-first-router/actions'
import getReduxLinkProps from '../../utils/getReduxLinkProps'
import Footer from '../Footer/Footer'
import './BlogPage.scss'
import '../../../map/components/loading-indicator/LoadingIndicator.scss'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'

const BlogPage = ({ children, id, documentTitle, slug, loading }) => {
  const { setDocumentTitle } = useDocumentTitle()
  const { trackPageView } = useMatomo()

  React.useEffect(
    /* istanbul ignore next */
    () => {
      if (documentTitle) {
        setDocumentTitle(documentTitle)
        trackPageView(documentTitle)
      }
    },
    [documentTitle],
  )

  const action = toSpecial(id, slug)
  const { href } = getReduxLinkProps(action)

  return (
    <Container className="blog-page" beamColor="valid">
      <Helmet>
        <link rel="canonical" href={href} />
      </Helmet>
      <div className="blog-page__body">
        {loading && <LoadingIndicator />}
        {children}
      </div>
      <Footer noMaxWidth />
    </Container>
  )
}

export default BlogPage
