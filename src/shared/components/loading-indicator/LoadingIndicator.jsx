import React from 'react'

import './_loading-indicator.scss'
import PropTypes from 'prop-types'
import { Spinner } from '@datapunt/asc-ui'

const LoadingIndicator = ({ IconComponent }) => (
  <div className="loading-indicator">{IconComponent}</div>
)

LoadingIndicator.defaultProps = {
  IconComponent: <Spinner size={36} color="secondary" />,
}

LoadingIndicator.propTypes = {
  IconComponent: PropTypes.node,
}

export default LoadingIndicator;
