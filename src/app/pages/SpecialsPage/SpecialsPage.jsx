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
  const [iFrameLoading, setIFrameLoading] = React.useState(true)
  const [iFrameHeight, setIFrameHeight] = React.useState(0)
  const iFrameRef = React.useRef(null)

  const handleResize = () =>
    window.addEventListener(
      'message',
      e => {
        if (typeof e.data === 'string' && e.data.indexOf('documentHeight:') > -1) {
          const height = e.data.split('documentHeight:')[1]
          setIFrameHeight(height)
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
    if (iFrameRef.current) {
      iFrameRef.current.height = `${iFrameHeight}px`
    }
  }, [iFrameHeight])

  const iFrameLoaded = () => {
    setIFrameLoading(false)
    // Handle resize when the iframe is loaded

    handleResize()
  }

  const { field_iframe_link: iFrameLink, title } = results ? results.data[0].attributes : {}

  return (
    <div className="iframe-container c-dashboard__page o-max-width">
      <Row>
        <Column
          wrap
          span={{ small: 4, medium: 8, big: 12, large: 18 }}
        >
          {iFrameLoading && (
            <div className="loading-indicator">
              <Spinner size={100} color="secondary" />
            </div>
          )}
          {!loading && iFrameLink && (
            <iframe
              src={iFrameLink.uri}
              // src="https://ois-amsterdam.gitlab.io/europese-verkiezingen-2019/"
              title={title}
              ref={iFrameRef}
              onLoad={iFrameLoaded}
              width="100%"
              height="100%"
              frameBorder="0"
            />
          )}
        </Column>
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  endpoint: `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special?filter[drupal_internal__nid]=${
    getLocationPayload(state).id
  } `,
})

export default connect(
  mapStateToProps,
  null,
)(SpecialsContainer)
