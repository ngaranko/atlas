import React from 'react';
import PropTypes from 'prop-types';

// import TickIcon from '../../../../public/images/icon-tick.svg';
import './_select.scss';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.label,
      value: props.value
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickChild = this.handleClickChild.bind(this);
  }

  handleClick(e) {
    console.log('handleClick');
  }

  handleClickChild(e) {
    console.log('handleClickChild');
    if (e.target.value !== this.state.value) {
      this.setState({
        label: e.currentTarget.innerText,
        value: e.currentTarget.value
      });
    }
  }

  render() {
    return (
      <span className="select">
        <input
          type="text"
          readOnly
          value={this.state.label}
          onClick={this.handleClick}
        />
        <input
          type="text"
          readOnly
          name={this.props.name}
          value={this.state.value}
          onClick={this.handleClick}
        />
        <ul>
          {this.props.children.length > 0 ? this.props.children.map(item => (
            <li
              className={item.props.value === this.state.value ? 'selected' : ''}
              key={item.props.value}>
              <button
                value={item.props.value}
                onClick={this.handleClickChild}
              >
                {item.props.children}
              </button>
            </li>
          )) : ''}
          <li>boe</li>
        </ul>
      </span>
    );
  }
}

Select.defaultProps = {
  label: '',
  value: ''
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Select;
