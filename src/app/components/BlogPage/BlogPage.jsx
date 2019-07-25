import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '@datapunt/asc-ui'
import { Helmet } from 'react-helmet'
import useDocumentTitle from '../../utils/useDocumentTitle'
import useMatomo from '../../utils/useMatomo'
import getReduxLinkProps from '../../utils/getReduxLinkProps'
import Footer from '../Footer/Footer'
import './BlogPage.scss'
import '../../../map/components/loading-indicator/LoadingIndicator.scss'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'

const BlogPage = ({ children, id, documentTitle, slug, loading, linkAction }) => {
  const { setDocumentTitle } = useDocumentTitle()
  const { trackPageView } = useMatomo()

  React.useEffect(() => {
    if (documentTitle) {
      setDocumentTitle(documentTitle)
      trackPageView(documentTitle)
    }
  }, [documentTitle])

  const action = linkAction(id, slug)
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

BlogPage.defaultProps = {
  documentTitle: '',
  slug: '',
  loading: false,
}

BlogPage.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  documentTitle: PropTypes.string,
  linkAction: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  slug: PropTypes.string,
}

export default BlogPage
