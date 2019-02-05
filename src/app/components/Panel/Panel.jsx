import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Panel = ({ children, isPanelVisible, canClose, type, size, closeAction }) => (
  (isPanelVisible) ? (
    <div
      className={`c-panel ${classNames({
        'c-panel--can-close': canClose,
        [`c-panel--${size}`]: size,
        [`c-panel--${type}`]: type
      })}`}
    >
      <section>
        {children}
      </section>

      {canClose && (
        <button
          className={`qa-btn-close ${classNames({
            [`o-btn--close o-btn--close--${type}`]: type,
            'o-btn--close--info': !type
          })}`}
          onClick={closeAction}
          title="Verbergen"
        >
          <span className="u-sr-only">Verbergen</span>
        </button>
      )}
    </div>
  ) : null
);

Panel.defaultProps = {
  type: 'info',
  size: '',
  canClose: true,
  isPanelVisible: false,
  children: null,
  closeAction: () => {
  }
};

Panel.propTypes = {
  isPanelVisible: PropTypes.bool,
  canClose: PropTypes.bool,
  type: PropTypes.oneOf(['info', 'warning', 'danger']),
  size: PropTypes.string,
  closeAction: PropTypes.func,
  children: PropTypes.node
};

export default Panel;
