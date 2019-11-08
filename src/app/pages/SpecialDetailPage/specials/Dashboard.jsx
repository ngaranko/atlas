import React from 'react'
import styled from '@datapunt/asc-core'
import { Column } from '@datapunt/asc-ui'

import setIframeSize from '../../../../shared/services/set-iframe-size/setIframeSize'
import LoadingIndicator from '../../../../shared/components/loading-indicator/LoadingIndicator'

const IFrameContainer = styled.div`
  position: relative;
  text-align: center;
  width: 100%;

  & iframe {
    min-height: 80vh;
  }
`

const Dashboard = ({ contentLink, title }) => {
  const [iframeLoading, setIframeLoading] = React.useState(true)
  const [iframeHeight, setIframeHeight] = React.useState(0)
  const iframeRef = React.useRef(null)

  const handleResize = () => {
    setIframeSize(setIframeHeight)
  }

  const iframeLoaded = () => {
    setIframeLoading(false)

    // Handle resize after the iframe is loaded
    handleResize(setIframeHeight)
  }

  React.useEffect(() => {
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

  return (
    <Column wrap span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 12 }}>
      <IFrameContainer>
        {iframeLoading && <LoadingIndicator />}
        {contentLink && contentLink.uri && (
          <iframe
            src={contentLink.uri}
            title={title}
            ref={iframeRef}
            onLoad={iframeLoaded}
            width="100%"
            height={iframeHeight}
            frameBorder="0"
          />
        )}
      </IFrameContainer>
    </Column>
  )
}

export default Dashboard
