import React from 'react';
import { mount } from 'enzyme';

import AutoSuggest from './AutoSuggest';

const mockFilledState = {
  suggestions: [
    {
      content: [
        {
          uri: 'bag/openbareruimte/03630000003186/',
          label: 'Dam',
          index: 0,
          category: 'Straatnamen'
        },
        {
          uri: 'bag/openbareruimte/03630000001038/',
          label: 'Damloperspad',
          index: 1,
          category: 'Straatnamen'
        },
        {
          uri: 'bag/openbareruimte/03630000003187/',
          label: 'Damrak',
          index: 2,
          category: 'Straatnamen'
        }
      ],
      label: 'Straatnamen'
    },
    {
      content: [
        {
          uri: 'monumenten/monumenten/8e8ae1dd-78a2-4a5f-841d-1870631b7e33/',
          label: 'Damrak 1',
          index: 3,
          category: 'Monumenten'
        },
        {
          uri: 'monumenten/monumenten/aa3f9081-2ac4-49ea-95d2-0aad7aecd883/',
          label: 'Dam 10',
          index: 4,
          category: 'Monumenten'
        },
        {
          uri: 'monumenten/monumenten/f93e31ba-89eb-4784-87e1-d32c33b5236d/',
          label: 'Damrak 15',
          index: 5,
          category: 'Monumenten'
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
    index: 3,
    category: 'Monumenten'
  }
};

const selectedSuggestion = {
  uri: 'bag/openbareruimte/03630000003187/',
  label: 'Damrak',
  index: 2,
  category: 'Straatnamen'
};

const onSubmit = jest.fn();
const onSuggestionActivate = jest.fn();
const onSuggestionSelection = jest.fn();
const onTextInput = jest.fn();

describe('The AutoSuggest component', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('optionally fills the searchbox with a query', () => {
    // Without a query
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
    />);
    expect(autoSuggestComponent.find('input#auto-suggest-textinput').text()).toBe('');

    // With a query
    const prefilledAutoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
      query={mockFilledState.query}
    />, { disableLifecycleMethods: false });

    // trigger the componentDidUpdate method
    prefilledAutoSuggestComponent.setProps({ query: mockFilledState.query });
    prefilledAutoSuggestComponent.update();

    expect(prefilledAutoSuggestComponent).toMatchSnapshot();
  });

  it('calls the prop function "onTextInput" on text input', () => {
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
      query={mockFilledState.query}
    />, { disableLifecycleMethods: false });

    // trigger the componentDidUpdate method
    autoSuggestComponent.setProps({ query: mockFilledState.query });
    autoSuggestComponent.update();

    const inputField = autoSuggestComponent.find('input#auto-suggest-textinput');
    inputField.simulate('input', { target: { value: 'd' } });
    inputField.simulate('input', { target: { value: 'a' } });
    inputField.simulate('input', { target: { value: 'm' } });

    expect(onTextInput).toHaveBeenCalledTimes(3);
  });

  it('should toggle the "showsuggestions" state on focus and blur of the input field', () => {
    jest.useFakeTimers();
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
      suggestions={mockFilledState.suggestions}
      query={mockFilledState.query}
    />, { disableLifecycleMethods: false });

    // trigger the componentDidUpdate method
    autoSuggestComponent.setProps({ query: mockFilledState.query });
    autoSuggestComponent.update();

    const inputField = autoSuggestComponent.find('input#auto-suggest-textinput');

    expect(autoSuggestComponent).toMatchSnapshot();
    inputField.simulate('focus');
    expect(autoSuggestComponent).toMatchSnapshot();
    inputField.simulate('blur');
    jest.runAllTimers();
    expect(autoSuggestComponent).toMatchSnapshot();
  });

  it('should allow the user to navigate with the keyboard', () => {
    const autoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit}
      onSuggestionActivate={onSuggestionActivate}
      onSuggestionSelection={onSuggestionSelection}
      onTextInput={onTextInput}
      suggestions={mockFilledState.suggestions}
      query={mockFilledState.query}
      numberOfSuggestions={mockFilledState.numberOfSuggestions}
    />);

    const inputField = autoSuggestComponent.find('input#auto-suggest-textinput');
    inputField.simulate('focus');
    expect(autoSuggestComponent).toMatchSnapshot();
    inputField.simulate('keydown', {
      target: {
        keyCode: 40,
        which: 40,
        key: 'down arrow',
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }
    });
    expect(autoSuggestComponent).toMatchSnapshot();
  });

  describe('when selecting a suggestion', () => {
    it('should set "shouldopeninnewwindow" boolean true if ctrl key is pressed', () => {
      const autoSuggestComponent = mount(<AutoSuggest
        activeSuggestion={{ index: -1 }}
        onSubmit={onSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={onSuggestionSelection}
        onTextInput={onTextInput}
      />);

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: true,
        metaKey: false
      };

      autoSuggestComponent.instance().onSuggestionSelection(selectedSuggestion, mockEvent);
      expect(onSuggestionSelection).toHaveBeenCalledWith(selectedSuggestion, true);
    });


    fit('should set "shouldopeninnewwindow" boolean false if no ctrl key is pressed', () => {
      const autoSuggestComponent = mount(<AutoSuggest
        activeSuggestion={{ index: -1 }}
        onSubmit={onSubmit}
        onSuggestionActivate={onSuggestionActivate}
        onSuggestionSelection={onSuggestionSelection}
        onTextInput={onTextInput}
      />);

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: false,
        metaKey: false
      };

      autoSuggestComponent.instance().onSuggestionSelection(selectedSuggestion, mockEvent);
      expect(onSuggestionSelection).toHaveBeenCalledWith(selectedSuggestion, false);
    });
  });

});
