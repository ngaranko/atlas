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

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickChild = this.handleClickChild.bind(this);
  }

  componentWillReceiveProps() {
    if (this.props.options.length > 0) {
      const selected = this.props.options.find(option => option.selected);
      this.setState({
        label: selected.label,
        value: selected.value
      });
    }
  }

  // @TODO custom icon should be loaded in prop

  handleToggle() {
    this.toggleCollapse();
  }

  handleClick(e) {
    e.preventDefault();

    this.toggleCollapse(false);

    console.log('handleClick', this.state.value);
    this.props.handleChange(this.state.value);
  }

  handleClickChild(e) {
    e.preventDefault();

    if (e.target.value !== this.state.value) {
      this.setState({
        label: e.target.innerText,
        value: e.target.value
      });

      this.props.handleChange(this.state.value);
    }

    this.toggleCollapse();
  }

  toggleCollapse(state = !this.state.expanded) {
    this.setState({
      expanded: state
    });
  }

  render() {
    const { options = [] } = this.props;
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
        </div>

        <span className="select__icon-wrapper" onClick={this.handleToggle}>
          <span className="select__icon select__icon--expand">
            <ExpandIcon />
          </span>
          <span className="select__icon select__icon--contract">
            <ContractIcon />
          </span>
        </span>

        <ul className="select__drop-down">
          {options.map(option => (
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
          ))}
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
