import React from 'react';
import PropTypes from 'prop-types';

import RemoveIcon from '../../../../public/images/icon-cross.svg';

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
        <button
          className="notification__button"
          onClick={this.hideNotification}
        >
          <RemoveIcon />
        </button>
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
  level: PropTypes.oneOf(['error', 'info'])
};

export default Notification;
