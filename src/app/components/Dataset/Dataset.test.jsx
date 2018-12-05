import React from 'react';
import { shallow } from 'enzyme';
import Dataset from './Dataset';

// Todo: properly test this
describe.only('Dataset', () => {
  it('should render the inital state', () => {
    const component = shallow(
      <Dataset
        activeFilters={{}}
        authError={false}
        page={1}
        results={{}}
        apiSpecification={{}}
        setPage={() => {
        }}
      />);
    expect(component).toMatchSnapshot();
  });
});
