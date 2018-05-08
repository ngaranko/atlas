import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '../../../../public/images/icon-cross-big.svg';

import './_notification.scss';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isNotificationVisible: true };

    this.hideNotification = this.hideNotification.bind(this);
  }

  hideNotification() {
    this.setState({ isNotificationVisible: false });
  }

  render() {
    return this.state.isNotificationVisible && (
      <p className={`
        ${this.props.className}
        notification
        notification--${this.props.level}
      `}
      >
        <span className="notification__content">{this.props.children}</span>
        { this.props.level !== 'message' &&
          <button
            className="notification__button"
            onClick={this.hideNotification}
          >
            <CloseIcon />
          </button>
        }
      </p>
    );
  }
}

Notification.defaultProps = {
  className: '',
  level: 'info'
};

Notification.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  level: PropTypes.oneOf(['error', 'info', 'message'])
};

export default Notification;
