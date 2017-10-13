import React from 'react';
import PropTypes from 'prop-types';

import ExpandIcon from '../../../../public/images/icon-arrow-down.svg';
import ContractIcon from '../../../../public/images/icon-arrow-up.svg';

import './_select-button.scss';

class SelectButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.label,
      value: props.value,
      className: props.className,
      expanded: props.expanded,
      disabled: props.disabled,
      icon: props.icon,
      options: props.options,
      isLoading: true
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickChild = this.handleClickChild.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  // @TODO custom icon should be loaded in prop

  componentWillReceiveProps(props) {
    this.setState({
      disabled: props.disabled
    });

    if ((this.state.isLoading || !this.state.isLoading && !props.disabled) && props.options.length > 0) {
      const selected = props.options.find(option => option.value === props.value)
        || props.options.find(option => option.selected);

      if (selected) {
        this.setState({
          label: selected.label,
          value: selected.value
        });
      }

      if (this.state.isLoading) {
        this.setState({
          isLoading: false
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
      <section className={`${this.state.className} select-button ${this.state.expanded ? 'select-button--expanded' : ''} ${this.state.disabled ? 'select-button--disabled' : ''}`}
        ref={(node) => { this.node = node; }}
      >
        <div
          className="select-button__wrapper"
          onClick={this.handleClick}
        >
          <span className="select-button__custom-icon">
            <this.props.icon />
          </span>
          <div className="select-button__label">
            {this.state.label}
          </div>
          <input
            type="hidden"
            name={this.state.name}
            value={this.state.value}
          />
        </div>

        <span className="select-button__icon-wrapper" onClick={this.handleToggle}>
          <span className="select-button__icon select-button__icon--expand">
            <ExpandIcon />
          </span>
          <span className="select-button__icon select-button__icon--contract">
            <ContractIcon />
          </span>
        </span>

        <ul className="select-button__drop-down">
          {options.map(option => (
            <li
              className={`select-button__drop-down-item ${option.value === this.state.value ? 'select-button__drop-down-item--selected' : ''}`}
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
  expanded: false,
  disabled: false,
  options: [],
  handleChange: () => {}
};

SelectButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func
};

export default SelectButton;
