import React from 'react'
import { connect } from 'react-redux'
import { iframeResizer } from 'iframe-resizer'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import useDataFetching from '../../utils/useDataFetching'

import './SpecialsPage.scss'

const iframeResizerOptions = { checkOrigin: false }

const SpecialsContainer = ({ endpoint }) => {
  const { fetchData, loading, errorMessage, results } = useDataFetching()
  const [iFrameLoading, setIFrameLoading] = React.useState(true)
  const iFrameRef = React.useRef(null)
  const iFrameContainerRef = React.useRef(null)

  let source
  if (results) {
    source = results.data[0].attributes.field_iframe_link.uri
  }

  React.useEffect(() => {
    fetchData(endpoint)
  }, [])

  React.useEffect(() => {
    // iframeResizer({
    //   heightCalculationMethod: 'bodyScroll',
    //   log: true,
    //   interval:32, maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,resizeFrom:"parent",scrolling:!1,sizeHeight: '100%',sizeWidth:!1,warningTimeout:5e3,tolerance:0,widthCalculationMethod:"scroll"
    // }, iFrameRef.current);
    setIFrameLoading(false)

    const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent'
    const eventer = window[eventMethod]
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'

    // Listen for event
    eventer(
      messageEvent,
      function(e) {
        // Check that message being passed is the documentHeight
        if (typeof e.data === 'string' && e.data.indexOf('documentHeight:') > -1) {
          // Split string from identifier
          const height = e.data.split('documentHeight:')[1]

          // do stuff with the height
          iFrameRef.current.height = `${height}px`;
        }
      },
      false,
    )
  }, [source])

  if (iFrameLoading) {
    return <div>loading...</div>
  }

  // console.log(iFrameRef.current)

  // if (iFrameRef.current) {
  //   console.log(iFrameRef.current.contentWindow.document.body.clientHeight, iFrameRef.current.contentWindow.document.body.scrollHeight)
  //   iFrameRef.current.height = `${document.body.offsetHeight  }px`;
  //   iFrameContainerRef.current.height = iFrameRef.current.height;

  //   console.log(document.body.scrollHeight, iFrameContainerRef.current.height)
  // }

  return (
    <div ref={iFrameContainerRef} className="iframe-container c-dashboard__page o-max-width">
      {iFrameLoading && <div>loading...</div>}
      {source && !iFrameLoading && (
        <iframe
          src="http://demo.bitsofco.de/responsive-iframe/iframe.html"
          ref={iFrameRef}
          width="100%"
          height="100%"
          frameBorder="0"
        />
      )}
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
