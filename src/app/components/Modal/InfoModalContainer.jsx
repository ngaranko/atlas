import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { isEmbedded } from '../../../shared/ducks/ui/ui'
import SHARED_CONFIG from '../../../shared/services/shared-config/shared-config'
import { createCookie, getCookie } from '../../utils/cookie'
import useDataFetching from '../../utils/useDataFetching'
import InfoModal from './InfoModal'

const COOKIE_NAME = 'showInfoModal'

const InfoModalWrapper = ({ hide }) => {
  if (!hide && !getCookie(COOKIE_NAME)) {
    const { fetchData, results } = useDataFetching()

    React.useEffect(() => {
      const endpoint = `${SHARED_CONFIG.CMS_ROOT}jsonapi/node/notification?filter[field_active]=1`
      fetchData(endpoint)
    }, [])

    if (results && results.data.length > 0) {
      const { title, body } = results.data[0].attributes

      return (
        <InfoModal
          id="infoModal"
          {...{ open: true, title, body: body.value }}
          closeModalAction={() => createCookie(COOKIE_NAME, '8')}
        />
      )
    }
  }

  return <></>
}

InfoModalWrapper.propTypes = {
  hide: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  hide: isEmbedded(state),
})

export default connect(
  mapStateToProps,
  null,
)(InfoModalWrapper)
