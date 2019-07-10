import React from 'react'
import PropTypes from 'prop-types'

import './_checkbox.scss'

class Checkbox extends React.Component {
  static evaluateChecked(checked) {
    if (typeof checked === 'function') {
      return !!checked()
    }
    return !!checked
  }

  constructor(props) {
    super(props)

    const { checked } = this.props
    this.state = {
      checked: Checkbox.evaluateChecked(checked),
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: Checkbox.evaluateChecked(nextProps.checked),
    })
  }

  handleChange(event) {
    const { onChange } = this.props
    const { checked } = this.state
    this.setState({
      checked: !checked,
    })
    onChange(event)
  }

  render() {
    const { name } = this.props
    const { checked } = this.state
    return (
      <span className="checkbox">
        <input
          checked={checked}
          name={name}
          aria-label={name}
          onChange={this.handleChange}
          type="checkbox"
        />
      </span>
    )
  }
}

/* istanbul ignore next */
Checkbox.defaultProps = {
  checked: false,
  onChange: () => {},
}

Checkbox.propTypes = {
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default Checkbox
