import { BlogPost, Column, Container, Row, Spinner } from '@datapunt/asc-ui'
import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import setIframeSize from '../../utils/setIframeSize'
import useDataFetching from '../../utils/useDataFetching'
import getReduxLinkProps from '../../utils/getReduxLinkProps'
import { toSpecial } from '../../../store/redux-first-router/actions'
import './SpecialsPage.scss'

const SpecialsPage = ({ id, endpoint }) => {
  const { fetchData, results, loading } = useDataFetching()
  const [iframeLoading, setIframeLoading] = React.useState(true)
  const [iframeHeight, setIframeHeight] = React.useState(0)
  const iframeRef = React.useRef(null)

  const handleResize = () => {
    setIframeSize(setIframeHeight)
  }

  React.useEffect(() => {
    fetchData(endpoint)

    window.addEventListener('resize', handleResize)

    return function cleanup() {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  React.useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.height = `${iframeHeight}px`
    }
  }, [iframeHeight])

  const iframeLoaded = () => {
    setIframeLoading(false)

    // Handle resize after the iframe is loaded
    handleResize(setIframeHeight)
  }

  const { field_iframe_link: iframeLink, slug = 'needs-slug', title } = results
    ? results.data[0].attributes
    : {}

  const action = toSpecial(id, slug)
  const { href } = getReduxLinkProps(action)

  return (
    <div className="iframe-container c-dashboard__page o-max-width">
      <Container>
        <Helmet>
          <link rel="canonical" href={href} />
        </Helmet>
        <BlogPost>
          <Row>
            <Column wrap span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 12 }}>
              {iframeLoading && (
                <div className="loading-indicator">
                  <Spinner size={36} color="secondary" />
                </div>
              )}
              {!loading && iframeLink && (
                <iframe
                  src={iframeLink.uri}
                  title={title}
                  ref={iframeRef}
                  onLoad={iframeLoaded}
                  width="100%"
                  height={iframeHeight}
                  frameBorder="0"
                />
              )}
            </Column>
          </Row>
        </BlogPost>
      </Container>
    </div>
  )
}

const mapStateToProps = state => {
  const { id } = getLocationPayload(state)
  return {
    id,
    endpoint: `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special?filter[drupal_internal__nid]=${id}`,
  }
}

export default connect(
  mapStateToProps,
  null,
)(SpecialsPage)
