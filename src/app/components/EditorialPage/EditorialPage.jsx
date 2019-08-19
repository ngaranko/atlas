import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Container } from '@datapunt/asc-ui'
import useDocumentTitle from '../../utils/useDocumentTitle'
import useMatomo from '../../utils/useMatomo'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'
import './EditorialPage.scss'
import '../../../map/components/loading-indicator/LoadingIndicator.scss'
import LoadingIndicator from '../../../shared/components/loading-indicator/LoadingIndicator'

const EditorialPage = ({ children, documentTitle, loading, linkAction }) => {
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
    <Container className="editorial-page" beamColor="valid">
      <Helmet>
        <link rel="canonical" href={href} />
      </Helmet>
      <div className="editorial-page__body">
        {loading && <LoadingIndicator />}
        {children}
      </div>
    </Container>
  )
}

EditorialPage.defaultProps = {
  documentTitle: '',
  loading: false,
}

EditorialPage.propTypes = {
  documentTitle: PropTypes.string,
  linkAction: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool,
}

export default EditorialPage
