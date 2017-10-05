import React from 'react';
import PropTypes from 'prop-types';

// import TickIcon from '../../../../public/images/icon-tick.svg';
import './_select.scss';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.label,
      value: props.value,
      expanded: props.expanded
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickChild = this.handleClickChild.bind(this);
  }

  handleClick(e) {
    console.log('handleClick', this.state.expanded);
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleClickChild(e) {
    console.log('handleClickChild');
    if (e.target.value !== this.state.value) {
      this.setState({
        label: e.currentTarget.innerText,
        value: e.currentTarget.value,
        expanded: !this.state.expanded
      });
    }
  }

  render() {
    return (
      <section className="select">
        <input
          type="text"
          className="select__label"
          readOnly
          value={this.state.label}
          onClick={this.handleClick}
        />
        <input
          type="hidden"
          readOnly
          name={this.props.name}
          value={this.state.value}
        />
      <ul className={`select__drop-down ${this.state.expanded ? 'select__drop-down--expanded' : ''}`}>
          {this.props.children.length > 0 ? this.props.children.map(item => (
            <li
              className={item.props.value === this.state.value ? 'select__drop-down-item--selected' : ''}
              key={item.props.value}>
              <button
                className="select__drop-down-button"
                value={item.props.value}
                onClick={this.handleClickChild}
              >
                {item.props.children}
              </button>
            </li>
          )) : ''}
        </ul>
      </section>
    );
  }
}

Select.defaultProps = {
  label: '',
  value: '',
  expanded: false
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  expanded: PropTypes.bool
};

export default Select;
