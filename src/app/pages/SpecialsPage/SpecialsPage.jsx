import { BlogPost, Column, Row, Spinner } from '@datapunt/asc-ui'
import React from 'react'
import { connect } from 'react-redux'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import setIframeSize from '../../utils/setIframeSize'
import useFromCMS from '../../utils/useFromCMS'
import './SpecialsPage.scss'
import BlogPage from '../../components/BlogPage/BlogPage'

const SpecialsPage = ({ id, endpoint }) => {
  const { fetchFromCMS, results, loading } = useFromCMS()
  const [iframeLoading, setIframeLoading] = React.useState(true)
  const [iframeHeight, setIframeHeight] = React.useState(0)
  const iframeRef = React.useRef(null)

  const handleResize = () => {
    setIframeSize(setIframeHeight)
  }

  React.useEffect(() => {
    ;(async () => {
      await fetchFromCMS(endpoint, ['field_iframe_link', 'field_slug'])
    })()

    window.addEventListener('resize', handleResize)

    return function cleanup() {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  React.useEffect(
    () => {
      if (iframeRef.current) {
        iframeRef.current.height = `${iframeHeight}px`
      }
    },
    [iframeHeight],
  )

  const iframeLoaded = () => {
    setIframeLoading(false)

    // Handle resize after the iframe is loaded
    handleResize(setIframeHeight)
  }

  const { field_iframe_link: iframeLink, field_slug: slug, title } = results || {}

  return (
    <BlogPage {...{id, slug, title}} loading={iframeLoading || loading}>
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
    endpoint: `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/special?filter[drupal_internal__nid]=${id}`,
  }
}

export default connect(
  mapStateToProps,
  null,
)(SpecialsPage)
