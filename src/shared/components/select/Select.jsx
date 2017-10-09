import React from 'react';
import PropTypes from 'prop-types';

import ExpandIcon from '../../../../public/images/icon-arrow-down.svg';
import ContractIcon from '../../../../public/images/icon-arrow-up.svg';

import CustomIcon from '../../../../public/images/icon-topography.svg';

import './_select.scss';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.label,
      value: props.value,
      className: props.className,
      expanded: props.expanded,
      disabled: props.disabled,
      options: props.options
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickChild = this.handleClickChild.bind(this);
  }

  // @TODO have to fix default selected value and label
  // @TODO custom icon should be loaded in prop

  handleClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleClickChild(e) {
    if (e.target.value !== this.state.value) {
      this.setState({
        label: e.currentTarget.innerText,
        value: e.currentTarget.value
      });

      this.props.handleChange(e, this.state.value);
    }

    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    return (
      <section className={`${this.state.className} select ${this.state.expanded ? 'select--expanded' : ''} ${this.state.disabled ? 'select--disabled' : ''}`}>
        <div
          className="select__wrapper"
          onClick={this.handleClick}
        >
          <span className="select__custom-icon">
            <CustomIcon />
          </span>
          <div className="select__label">
            {this.state.label}
          </div>
          <input
            type="hidden"
            name={this.state.name}
            value={this.state.value}
          />
          <span className="select__icon select__icon--expand">
            <ExpandIcon />
          </span>
          <span className="select__icon select__icon--contract">
            <ContractIcon />
          </span>
        </div>
        <ul className="select__drop-down">
          {this.props.options && this.props.options.length > 0 ? this.props.options.map(option => (
            <li
              className={`select__drop-down-item ${option.value === this.state.value ? 'select__drop-down-item--selected' : ''}`}
              key={option.value}
            >
              <button
                className="select__drop-down-button"
                value={option.value}
                onClick={this.handleClickChild}
              >
                {option.label}
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
  className: '',
  expanded: false,
  disabled: false,
  options: [],
  handleChange: () => {}
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func
};

export default Select;
