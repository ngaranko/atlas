import React from 'react'
import PropTypes from 'prop-types'

import './_notification.scss'

class Notification extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isNotificationVisible: true }

    this.hideNotification = this.hideNotification.bind(this)
  }

  hideNotification() {
    this.setState({ isNotificationVisible: false })
  }

  render() {
    const { level, children, className, canClose } = this.props
    const { isNotificationVisible } = this.state
    return (
      isNotificationVisible && (
        <div
          className={`
        ${className}
        notification
        notification--${level}
        qa-notification
      `}
        >
          <span className="notification__content">{children}</span>
          {level !== 'message' && canClose && (
            <button type="button" className="notification__button" onClick={this.hideNotification}>
              <span className="notification__button--close" />
            </button>
          )}
        </div>
      )
    )
  }
}

Notification.defaultProps = {
  canClose: true,
  className: '',
  level: 'info',
}

Notification.propTypes = {
  canClose: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  level: PropTypes.oneOf(['alert', 'info', 'message', 'disclaimer']),
}

export default Notification
