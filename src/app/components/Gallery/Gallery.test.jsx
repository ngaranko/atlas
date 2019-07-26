import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';

jest.mock('../../../shared/services/link-attributes-from-action/linkAttributesFromAction');

describe('Gallery', () => {
  let component;

  const fullArrayOfThumbnails = Array(10).fill('img.jpg');

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    component = shallow(
      <Gallery
        id="foo1234"
        allThumbnails={fullArrayOfThumbnails}
        onClick={jest.fn}
        title="Title!"
      />
    );
  });

  it('should show max 6 results initially', () => {
    expect(component.find('.c-gallery__item')).toHaveLength(6);
  });

  it('should be able toggle between showing 6 or all results', () => {
    component.find('.c-gallery__button').simulate('click');
    expect(setState).toHaveBeenCalledWith(fullArrayOfThumbnails);
  });
});
