import { BlogPost, Column, Row } from '@datapunt/asc-ui'
import React from 'react'
import { connect } from 'react-redux'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import setIframeSize from '../../../shared/services/set-iframe-size/setIframeSize'
import useFromCMS from '../../utils/useFromCMS'
import './SpecialDetailPage.scss'
import BlogPage from '../../components/BlogPage/BlogPage'
import cmsConfig from '../../../shared/services/cms/cms-config'
import { toSpecialDetail } from '../../../store/redux-first-router/actions'

const SpecialDetailPage = ({ id }) => {
  const { fetchData, results, loading } = useFromCMS()
  const [iframeLoading, setIframeLoading] = React.useState(true)
  const [iframeHeight, setIframeHeight] = React.useState(0)
  const iframeRef = React.useRef(null)

  const handleResize = () => {
    setIframeSize(setIframeHeight)
  }

  React.useEffect(() => {
    (async () => {
      await fetchData(id, cmsConfig.special)
    })()

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

  const { field_iframe_link: iframeLink, field_slug: slug, field_special_type: type, title } = results || {}
  const documentTitle = `Special: ${title}`
  const linkAction = toSpecialDetail(id, type, slug)

  return (
    <BlogPage
      {...{ documentTitle, linkAction }}
      loading={iframeLoading || loading}
    >
      <div className="iframe-container ">
        <Row>
          <BlogPost>
            <Column wrap span={{ small: 12, medium: 12, big: 12, large: 12, xLarge: 12 }}>
              {iframeLink && (
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
          </BlogPost>
        </Row>
      </div>
    </BlogPage>
  )
}

const mapStateToProps = state => {
  const { id } = getLocationPayload(state)
  return {
    id,
  }
}

export default connect(
  mapStateToProps,
  null,
)(SpecialDetailPage)
