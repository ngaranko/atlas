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
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  // @TODO custom icon should be loaded in prop

  componentWillReceiveProps() {
    if (this.props.options.length > 0 && !this.state.label && !this.state.value) {
      const selected = this.props.options.find(option => option.selected);

      if (selected) {
        this.setState({
          label: selected.label,
          value: selected.value
        });
      }
    }
  }

  handleToggle() {
    if (!this.state.expanded) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.toggleCollapse();
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleToggle();
  }

  handleClick(e) {
    e.preventDefault();

    this.toggleCollapse(false);

    this.props.handleChange(this.state.value);
  }

  handleClickChild(e) {
    e.preventDefault();

    if (e.currentTarget.value !== this.state.value) {
      this.setState({
        label: e.currentTarget.innerText,
        value: e.currentTarget.value
      });

      this.props.handleChange(e.currentTarget.value);
    }

    this.handleToggle();
  }

  toggleCollapse(state = !this.state.expanded) {
    this.setState({
      expanded: state
    });
  }

  render() {
    const { options = [] } = this.props;
    return (
      <section className={`${this.state.className} select ${this.state.expanded ? 'select--expanded' : ''} ${this.state.disabled ? 'select--disabled' : ''}`}
        ref={node => { this.node = node; }}
      >
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
