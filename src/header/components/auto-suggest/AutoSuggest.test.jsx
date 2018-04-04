import React from 'react';
import { shallow, mount } from 'enzyme';

import AutoSuggest from './AutoSuggest';

const mockInitialState = {
  suggestions: [],
  query: '',
  numberOfSuggestions: 0,
  isDatasetView: false,
  activeSuggestion: {
    index: -1
  }
};

const mockFilledState = {
  suggestions: [
    {
      content: [
        {
          uri: 'bag/openbareruimte/03630000003186/',
          label: 'Dam',
          index: 0
        },
        {
          uri: 'bag/openbareruimte/03630000001038/',
          label: 'Damloperspad',
          index: 1
        },
        {
          uri: 'bag/openbareruimte/03630000003187/',
          label: 'Damrak',
          index: 2
        }
      ],
      label: 'Straatnamen'
    },
    {
      content: [
        {
          uri: 'monumenten/monumenten/8e8ae1dd-78a2-4a5f-841d-1870631b7e33/',
          label: 'Damrak 1',
          index: 3
        },
        {
          uri: 'monumenten/monumenten/aa3f9081-2ac4-49ea-95d2-0aad7aecd883/',
          label: 'Dam 10',
          index: 4
        },
        {
          uri: 'monumenten/monumenten/f93e31ba-89eb-4784-87e1-d32c33b5236d/',
          label: 'Damrak 15',
          index: 5
        }
      ],
      label: 'Monumenten'
    }
  ],
  query: 'dam',
  numberOfSuggestions: 60,
  isDatasetView: false,
  activeSuggestion: {
    uri: 'monumenten/monumenten/8e8ae1dd-78a2-4a5f-841d-1870631b7e33/',
    label: 'Damrak 1',
    index: 3
  }
};

const onSubmit = jest.fn();
const onSuggestionNavigation = jest.fn();
const onSuggestSelection = jest.fn();
const onTextInput = jest.fn();

describe('AutoSuggest', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('optionally fills the searchbox with a query', () => {
    // Without a query
    const emptyAutoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={jest.fn()}
      onSuggestionNavigation={jest.fn()}
      onSuggestSelection={jest.fn()}
      onTextInput={jest.fn()}
    />);
    expect(emptyAutoSuggestComponent.find('input#auto-suggest-input').text()).toBe('');

    // With a query
    const filledAutoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionNavigation={onSuggestionNavigation}
      onSuggestSelection={onSuggestSelection}
      onTextInput={onTextInput}
      query={mockFilledState.query}
    />, { disableLifecycleMethods: false });

    filledAutoSuggestComponent.setProps({ query: mockFilledState.query });
    filledAutoSuggestComponent.update();

    // TODO FIXME
    // expect(filledAutoSuggestComponent.find('input#auto-suggest-input').text()).toBe(mockFilledState.query);
  });

  fit('calls the prop ontextinput on text input', () => {

    const emptyAutoSuggestComponent = shallow(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionNavigation={onSuggestionNavigation}
      onSuggestSelection={onSuggestSelection}
      onTextInput={onTextInput}
    />);

    jest.spyOn(emptyAutoSuggestComponent.prototype, 'onTextInput');
    emptyAutoSuggestComponent.find('input#auto-suggest-input').type('test');
    expect(AutoSuggest.onTextInput).toHaveBeenCalledTimes(4);

  });

});
