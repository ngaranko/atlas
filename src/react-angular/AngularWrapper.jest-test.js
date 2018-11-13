import React from 'react';
import { shallow } from 'enzyme';
import AngularWrapper from './AngularWrapper';

describe('AngularWrapper', () => {
  it('should render', () => {
    const element = shallow(
      <AngularWrapper
        moduleName="plopWrapper"
        component="plop"
      />,
    );

    expect(element).toMatchSnapshot();
  });

  it('should set the proper angular attributes', () => {
    const element = shallow(
      <AngularWrapper
        moduleName="plopWrapper"
        component="plop"
        bindings={{
          foo: 'bar',
        }}
        interpolateBindings={{
          boo: 'faz',
        }}
      />,
    );

    expect(element.instance().angularComponent).toEqual(<plop boo="{{boo}}" foo="foo" />);
  });

  describe('bindings', () => {
    let element;

    beforeEach(() => {
      element = shallow(
        <AngularWrapper
          moduleName="plopWrapper"
          component="plop"
          bindings={{
            foo: 'bar',
          }}
          interpolateBindings={{
            boo: 'faz',
          }}
        />,
      );
    });

    it('should update the scope when interpolateBindings are updated', () => {
      element.instance().angularRef = { $scope: { $digest: jest.fn() } };

      element.setProps({ interpolateBindings: { boo: 'qaz' } });
      expect(element.instance().angularRef.$scope).toMatchObject({ boo: 'qaz', foo: 'bar' });
      expect(element.instance().angularRef.$scope.$digest).toHaveBeenCalled();
    });

    it('should update the scope when bindings are updated', () => {
      element.instance().angularRef = { $scope: { $digest: jest.fn() } };

      element.setProps({ bindings: { foo: 'baz' } });
      expect(element.instance().angularRef.$scope).toMatchObject({ boo: 'faz', foo: 'baz' });
      expect(element.instance().angularRef.$scope.$digest).toHaveBeenCalled();
    });
  });
});
