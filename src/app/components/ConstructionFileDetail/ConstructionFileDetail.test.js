import React from 'react';
import { shallow } from 'enzyme';
import ConstructionFileDetail from './ConstructionFileDetail';

jest.mock('../../utils/getReduxLinkProps');

describe('ConstructionFileDetail', () => {
  let mockResults = {
    titel: 'title',
    subdossiers: null,
    datering: 'date',
    dossier_type: 'fileType',
    dossiernr: 'fileNumber',
    adressen: []
  };
  let component = shallow(<ConstructionFileDetail results={mockResults} />);

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  it('returns the component', () => {
    expect(component.at(0).exists()).toBeTruthy();
  });

  it('should set the title', () => {
    expect(component.at(0).find('Typography').at(1)).toBeTruthy();
    expect(component.at(0).find('Typography').at(1).props().children).toBe(mockResults.titel);
  });

  it('should render the subfiles', () => {
    mockResults = {
      ...mockResults,
      subdossiers: [
            { titel: 'subdossiers', bestanden: [] }
      ]
    };

    component = shallow(<ConstructionFileDetail results={mockResults} />);
    expect(component.at(0).find('Gallery').at(0)).toBeTruthy();
    expect(component.at(0).find('Gallery').at(0).props().title).toBe(mockResults.subdossiers[0].titel);
  });

  it('should render the addresses', () => {
    const mockAdres = { nummeraanduidingen: ['1234'],
      nummeraanduidingen_label: ['foo']
    };

    mockResults = {
      ...mockResults,
      adressen: [mockAdres]
    };

    component = shallow(<ConstructionFileDetail results={mockResults} />);

    expect(component.at(0).find('.o-list').at(0)).toBeTruthy();
    expect(component.at(0).find('.o-list li a').at(0)).toBeTruthy();
    expect(component.at(0).find('.o-list li a').at(0).props().title).toBe(mockAdres.nummeraanduidingen_label[0]);
    expect(component.at(0).find('.o-list li a').at(0).props().children).toBe(mockAdres.nummeraanduidingen_label[0]);
  });
});
