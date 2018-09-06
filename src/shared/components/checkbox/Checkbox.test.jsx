import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  const mockFn = jest.fn();
  const defaultProps = {
    checked: false,
    name: 'checkbox',
    onChange: mockFn
  };

  it('should render with default props', () => {
    const wrapper = shallow(
      <Checkbox name={'test'} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render everything', () => {
    const wrapper = shallow(
      <Checkbox {...defaultProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call mock function when checkbox is value is changed and update the checked', () => {
    const wrapper = shallow(
      <Checkbox {...defaultProps} />
    );
    const changeEvent = { value: true };
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.state.checked).toEqual(false);
    wrapper.find('input').simulate('change', changeEvent);
    expect(mockFn).toHaveBeenCalledWith(changeEvent);
    expect(wrapperInstance.state.checked).toEqual(true);
    wrapper.setProps({ checked: false });
    expect(wrapperInstance.state.checked).toEqual(false);
  });

  it('should update the checked state if the checked props is changed', () => {
    const wrapper = shallow(
      <Checkbox {...defaultProps} />
    );
    const wrapperInstance = wrapper.instance();
    wrapper.setProps({ checked: true });
    expect(wrapperInstance.state.checked).toEqual(true);
  });

  it('should be able to pass a function as checked prop', () => {
    let returnValue = false;
    const checkedFn = jest.fn(() => returnValue);
    const wrapper = shallow(
      <Checkbox {...defaultProps} checked={checkedFn} />
    );
    const wrapperInstance = wrapper.instance();
    expect(wrapperInstance.state.checked).toEqual(false);
    returnValue = true;
    wrapper.setProps({ checked: checkedFn });
    expect(wrapperInstance.state.checked).toEqual(true);
  });
});
