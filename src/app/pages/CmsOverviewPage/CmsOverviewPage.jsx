import React from 'react'
import { connect } from 'react-redux'

const CmsOverviewPage = ({ type = ''}) => {
  return <div>CmsOverviewPage = {type}</div>
}

const mapStateToProps = () => ({})

export default connect(
  mapStateToProps,
  null,
)(CmsOverviewPage)
