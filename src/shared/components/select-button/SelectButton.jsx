import React from 'react';
import PropTypes from 'prop-types';

import ExpandIcon from '../../../../public/images/icon-arrow-down.svg';
import CollapseIcon from '../../../../public/images/icon-arrow-up.svg';

import './_select-button.scss';

class SelectButton extends React.Component {
  constructor(props) {
    super(props);

    let selected = {};

    console.log(props.isDisabled, props.options, props.value);

    if (!props.isDisabled && props.options.length > 0) {
      selected = props.options.find((option) => option.value === props.value)
        || props.options.find((option) => option.selected)
        || props.options[0];
    }

    this.state = {
      label: selected.label || props.label,
      value: props.value,
      className: props.className,
      isExpanded: props.isExpanded,
      isDisabled: props.isDisabled,
      icon: props.icon,
      options: props.options
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickChild = this.handleClickChild.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      isDisabled: props.isDisabled
    });

    if (!props.isDisabled && props.options.length > 0) {
      const selected = props.options.find((option) => option.value === props.value)
        || props.options.find((option) => option.selected)
        || props.options[0];

      if (selected) {
        this.setState({
          label: selected.label,
          value: selected.value
        });
      }
    }
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

SelectButton.defaultProps = {
  label: '',
  value: '',
  className: '',
  isExpanded: false,
  isDisabled: false,
  options: [],
  handleChange: () => {}
};

SelectButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func
};

export default SelectButton;
