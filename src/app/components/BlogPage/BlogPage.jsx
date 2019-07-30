import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '@datapunt/asc-ui'
import { Helmet } from 'react-helmet'
import useDocumentTitle from '../../utils/useDocumentTitle'
import useMatomo from '../../utils/useMatomo'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'
import Footer from '../Footer/Footer'
import './BlogPage.scss'
import '../../../map/components/loading-indicator/LoadingIndicator.scss'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'

const BlogPage = ({ children, documentTitle, loading, linkAction }) => {
  const { setDocumentTitle } = useDocumentTitle()
  const { trackPageView } = useMatomo()

  React.useEffect(() => {
    if (documentTitle) {
      setDocumentTitle(documentTitle)
      trackPageView(documentTitle)
    }
  }, [documentTitle])

  const { href } = linkAttributesFromAction(linkAction)

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
  loading: false,
}

BlogPage.propTypes = {
  documentTitle: PropTypes.string,
  linkAction: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool,
}

export default BlogPage
