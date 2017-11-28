import React from 'react';
import PropTypes from 'prop-types';

import ExpandIcon from '../../../../public/images/icon-arrow-down.svg';
import CollapseIcon from '../../../../public/images/icon-arrow-up.svg';

import './_select-button.scss';

class SelectButton extends React.Component {
  static getSelected(props) {
    return props.options.find((option) => option.value === props.value) ||
      props.options[0] ||
      {
        label: props.label,
        value: props.value
      };
  }

  constructor(props) {
    super(props);

    const selected = SelectButton.getSelected(props);

    this.state = {
      className: props.className,
      icon: props.icon,
      isDisabled: props.isDisabled,
      isExpanded: props.isExpanded,
      label: selected.label,
      options: props.options,
      value: selected.value
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickChild = this.handleClickChild.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let state = { isDisabled: nextProps.isDisabled };

    if (!this.state.value || nextProps.value) {
      const selected = SelectButton.getSelected(nextProps);

      state = {
        ...state,
        label: selected.label,
        value: selected.value
      };
    }

    this.setState(state);
  }

  handleToggle() {
    // Attach/remove event handler
    if (!this.state.isExpanded) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.toggleCollapse();
  }

  handleOutsideClick(event) {
    // Ignore clicks on the component itself
    if (this.node.contains(event.target)) {
      return;
    }

    this.handleToggle();
  }

  handleClick(event) {
    event.preventDefault();

    this.toggleCollapse(false);

    this.props.handleChange(this.state.value);
  }

  handleClickChild(event) {
    event.preventDefault();

    this.setState({
      label: event.currentTarget.innerText,
      value: event.currentTarget.value
    });

    this.props.handleChange(event.currentTarget.value);

    this.handleToggle();
  }

  toggleCollapse(state = !this.state.isExpanded) {
    this.setState({
      isExpanded: state
    });
  }

  render() {
    const { options = [] } = this.props;
    return (
      <section
        className={`
          ${this.state.className}
          select-button
          ${this.state.isExpanded && 'select-button--expanded'}
          ${this.state.isDisabled && 'select-button--disabled'}
        `}
        ref={(node) => { this.node = node; }}
      >
        <button
          className="select-button__wrapper"
          onClick={this.handleClick}
        >
          <this.props.icon className="select-button__custom-icon" />
          <div className="select-button__label">
            {this.state.label}
          </div>
        </button>

        <button
          className="select-button__icon-wrapper"
          onClick={this.handleToggle}
        >
          <span className="select-button__icon select-button__icon--expand">
            <ExpandIcon />
          </span>
          <span className="select-button__icon select-button__icon--collapse">
            <CollapseIcon />
          </span>
        </button>

        <ul className="select-button__drop-down">
          {options.map((option) => (
            <li
              className={`
                select-button__drop-down-item
                ${option.value === this.state.value && 'select-button__drop-down-item--selected'}
              `}
              key={option.value}
            >
              <button
                className="select-button__drop-down-button"
                onClick={this.handleClickChild}
                value={option.value}
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

SelectButton.defaultProps = {
  className: '',
  handleChange: () => {},
  isDisabled: false,
  isExpanded: false,
  label: '',
  options: [],
  value: ''
};

SelectButton.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  icon: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isExpanded: PropTypes.bool,
  label: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string // eslint-disable-line react/no-unused-prop-types
};

export default SelectButton;
