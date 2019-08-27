import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Container } from '@datapunt/asc-ui'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import useDocumentTitle from '../../utils/useDocumentTitle'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'
import './EditorialPage.scss'
import '../../../map/components/loading-indicator/LoadingIndicator.scss'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'
import Footer from '../Footer/Footer'

const EditorialPage = ({ children, documentTitle, loading, linkAction }) => {
  const { setDocumentTitle } = useDocumentTitle()
  const { trackPageView } = useMatomo()

  React.useEffect(() => {
    if (documentTitle) {
      setDocumentTitle(documentTitle)
      trackPageView({ documentTitle })
    }
  }, [documentTitle])

  const href = linkAction && linkAttributesFromAction(linkAction).href

  return (
    <Container className="editorial-page" beamColor="valid">
      <Helmet>{href && <link rel="canonical" href={href} />}</Helmet>
      <div className="editorial-page__body">
        {loading && <LoadingIndicator />}
        {children}
      </div>
      <Footer />
    </Container>
  )
}

EditorialPage.defaultProps = {
  documentTitle: '',
  loading: false,
  linkAction: null,
}

EditorialPage.propTypes = {
  documentTitle: PropTypes.string,
  linkAction: PropTypes.shape({}),
  loading: PropTypes.bool,
}

export default EditorialPage
