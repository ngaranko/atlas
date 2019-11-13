import { Row } from '@datapunt/asc-ui'
import React from 'react'
import { connect } from 'react-redux'
import { getLocationPayload } from '../../../store/redux-first-router/selectors'
import useFromCMS from '../../utils/useFromCMS'
import EditorialPage from '../../components/EditorialPage/EditorialPage'
import { cmsConfig } from '../../../shared/config/config'
import { toSpecialDetail } from '../../../store/redux-first-router/actions'
import ContentContainer from '../../components/ContentContainer/ContentContainer'
import { routing } from '../../routes'
import Dashboard from './specials/Dashboard'
import Animation from './specials/Animation'
import { SPECIAL_TYPES } from '../../../shared/config/cms.config'

const SpecialDetailPage = ({ id }) => {
  const { fetchData, results, loading, error } = useFromCMS(cmsConfig.SPECIAL, id)

  React.useEffect(() => {
    fetchData()
  }, [id])

  React.useEffect(() => {
    if (error) {
      window.location.replace(routing.niet_gevonden.path)
    }
  }, [error])

  const { field_content_link: contentLink, slug, specialType, title } = results || {}
  const documentTitle = title && `Special: ${title}`

  const linkAction = toSpecialDetail(id, specialType, slug)

  return (
    <EditorialPage {...{ documentTitle, linkAction }} loading={loading}>
      <Row>
        <ContentContainer>
          {specialType === SPECIAL_TYPES.ANIMATION && (
            <Animation contentLink={contentLink} title={title} results={results} />
          )}
          {specialType === SPECIAL_TYPES.DASHBOARD && (
            <Dashboard contentLink={contentLink} title={title} />
          )}
        </ContentContainer>
      </Row>
    </EditorialPage>
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
