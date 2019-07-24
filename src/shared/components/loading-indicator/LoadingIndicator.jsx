import React from 'react'

import './_loading-indicator.scss'
import PropTypes from 'prop-types'

const LoadingIndicator = ({ IconComponent }) => (
  <div className="loading-indicator">
    {IconComponent}
  </div>
)

LoadingIndicator.defaultProps = {
  IconComponent: <span className="icon" />,
}

LoadingIndicator.propTypes = {
  IconComponent: PropTypes.node,
}

export default LoadingIndicator
