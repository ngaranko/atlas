import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Panel from '../../Panel/Panel'

const ErrorMessage = ({ hasMaxWidth, isHomePage, dismissError, errorMessage }) => (
  <div className="c-dashboard__error">
    <div
      className={`u-background-color__primary--light ${classNames({
        'o-max-width': hasMaxWidth,
      })}`}
    >
      <div
        className={classNames({
          'o-max-width__inner': hasMaxWidth,
          'u-gutter': isHomePage,
        })}
      >
        <div className="c-api-error__panel">
          <Panel
            isPanelVisible
            canClose
            type="danger"
            className="qa-api-error"
            size="small"
            closeAction={dismissError}
          >
            <div className="c-api-error__panel-text">
              <span className="qa-api-general-error">{errorMessage}</span>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  </div>
)

ErrorMessage.defaultProps = {
  hasMaxWidth: false,
  isHomePage: false,
  dismissError: () => {},
}

ErrorMessage.propTypes = {
  dismissError: PropTypes.func,
  hasMaxWidth: PropTypes.bool,
  isHomePage: PropTypes.bool,
  errorMessage: PropTypes.string.isRequired,
}

export default ErrorMessage
