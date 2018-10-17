import React from 'react';
import { shallow } from 'enzyme';
import AutoSuggestCategory from './AutoSuggestCategory';

describe.only('AutoSuggestCategory', () => {
  let props;
  beforeEach(() => {
    props = {
      activeSuggestion: {
        index: -1
      },
      category: {
        label: 'Straatnamen',
        content: [
          {
            category: 'Straatnamen',
            index: 0,
            label: 'Dam',
            uri: 'bag/openbareruimte/03630000003186/'
          },
          {
            category: 'Straatnamen',
            index: 1,
            label: 'Damloperspad',
            uri: 'bag/openbareruimte/03630000001038/'
          },
          {
            category: 'Straatnamen',
            index: 2,
            label: 'Damrak',
            uri: 'bag/openbareruimte/03630000003187/'
          }
        ],
        total_results: 6
      },
      onSuggestionSelection: jest.fn(),
      query: 'dam'
    };
  });

  it('should render with ellipsis', () => {
    const wrapper = shallow(
      <AutoSuggestCategory {...props} />
    ).dive();

    expect(wrapper).toMatchSnapshot();
    const items = wrapper.find('AutoSuggestItem');
    expect(items.length).toBe(4);
    wrapper.find('AutoSuggestItem').at(3).simulate('click');
    expect(props.onSuggestionSelection).toHaveBeenCalled();
  });
});
