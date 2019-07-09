import React from 'react'
import { connect } from 'react-redux'
import throttle from 'lodash.throttle'
import { Column, Row, Spinner } from '@datapunt/asc-ui'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import useDataFetching from '../../utils/useDataFetching'

import './SpecialsPage.scss'

const SpecialsContainer = ({ endpoint }) => {
  const { fetchData, results, loading } = useDataFetching()
  const [iframeLoading, setIframeLoading] = React.useState(true)
  const [iframeHeight, setIframeHeight] = React.useState(0)
  const iframeRef = React.useRef(null)

  const handleResize = () =>
    window.addEventListener(
      'message',
      e => {
        if (typeof e.data === 'string' && e.data.indexOf('documentHeight:') > -1) {
          const height = e.data.split('documentHeight:')[1]
          setIframeHeight(height)
        }
      },
      false,
    )

  const throttledHandleResize = () => {
    throttle(handleResize, 300)
  }

  React.useEffect(() => {
    fetchData(endpoint)

    window.addEventListener('resize', throttledHandleResize)

    return function cleanup() {
      window.removeEventListener('resize', throttledHandleResize)
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
    handleResize()
  }

  const { field_iframe_link: iframeLink, title } = results ? results.data[0].attributes : {}

  return (
    <div className="iframe-container c-dashboard__page o-max-width">
      <Row>
        <Column
          wrap="true"
          span={{ small: 4, medium: 8, big: 12, large: 18 }}
        >
          {iframeLoading && (
            <div className="loading-indicator">
              <Spinner size={100} color="secondary" />
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
    </div>
  )
}

const mapStateToProps = state => ({
  endpoint: `${SHARED_CONFIG.CMS_ROOT}special?filter[drupal_internal__nid]=${
    getLocationPayload(state).id
  } `,
})

export default connect(
  mapStateToProps,
  null,
)(SpecialsContainer)
