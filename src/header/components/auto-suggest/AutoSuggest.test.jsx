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

const onSubmit = {
  fn: jest.fn()
};
const onSuggestionActivate = {
  fn: jest.fn()
};
const onSuggestionSelection = {
  fn: jest.fn()
};
const onTextInput = {
  fn: jest.fn()
};

describe('The AutoSuggest component', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('optionally fills the searchbox with a query', () => {
    // Without a query
    const emptyAutoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit.fn}
      onSuggestionActivate={onSuggestionActivate.fn}
      onSuggestionSelection={onSuggestionSelection.fn}
      onTextInput={onTextInput.fn}
    />);
    expect(emptyAutoSuggestComponent.find('input#auto-suggest-textinput').text()).toBe('');

    // With a query
    const filledAutoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit.fn}
      onSuggestionActivate={onSuggestionActivate.fn}
      onSuggestionSelection={onSuggestionSelection.fn}
      onTextInput={onTextInput.fn}
      query={mockFilledState.query}
    />, { disableLifecycleMethods: false });

    filledAutoSuggestComponent.setProps({ query: mockFilledState.query });
    filledAutoSuggestComponent.update();

    expect(filledAutoSuggestComponent).toMatchSnapshot();
  });

  it('calls the prop function "onTextInput" on text input', () => {
    const emptyAutoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit.fn}
      onSuggestionActivate={onSuggestionActivate.fn}
      onSuggestionSelection={onSuggestionSelection.fn}
      onTextInput={onTextInput.fn}
    />);

    jest.spyOn(onTextInput, 'fn');
    const inputField = emptyAutoSuggestComponent.find('input#auto-suggest-textinput');
    inputField.simulate('input', { target: { value: 'd' } });
    inputField.simulate('input', { target: { value: 'a' } });
    inputField.simulate('input', { target: { value: 'm' } });

    expect(onTextInput.fn).toHaveBeenCalledTimes(3);
  });

  it('should toggle the "showsuggestions" state on focus and blur of the input field', () => {
    jest.useFakeTimers();
    const emptyAutoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit.fn}
      onSuggestionActivate={onSuggestionActivate.fn}
      onSuggestionSelection={onSuggestionSelection.fn}
      onTextInput={onTextInput.fn}
    />);

    expect(emptyAutoSuggestComponent.state().showSuggestions).toBe(false);
    const inputField = emptyAutoSuggestComponent.find('input#auto-suggest-textinput');
    inputField.simulate('focus');
    expect(emptyAutoSuggestComponent.state().showSuggestions).toBe(true);
    inputField.simulate('blur');
    jest.runAllTimers();
    expect(emptyAutoSuggestComponent.state().showSuggestions).toBe(false);
  });

  it('should allow the user to navigate with the keyboard', () => {
    const emptyAutoSuggestComponent = mount(<AutoSuggest
      activeSuggestion={{ index: -1 }}
      onSubmit={onSubmit.fn}
      onSuggestionActivate={onSuggestionActivate.fn}
      onSuggestionSelection={onSuggestionSelection.fn}
      onTextInput={onTextInput.fn}
      suggestions={mockFilledState.suggestions}
      query={mockFilledState.query}
      numberOfSuggestions={mockFilledState.numberOfSuggestions}
    />);

    const inputField = emptyAutoSuggestComponent.find('input#auto-suggest-textinput');
    inputField.simulate('focus');
    expect(emptyAutoSuggestComponent).toMatchSnapshot();
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
    expect(emptyAutoSuggestComponent).toMatchSnapshot();
  });

  describe('when selecting a suggestion', () => {
    it('should set "shouldopeninnewwindow" boolean true if ctrl key is pressed', () => {
      const emptyAutoSuggestComponent = mount(<AutoSuggest
        activeSuggestion={{ index: -1 }}
        onSubmit={onSubmit.fn}
        onSuggestionActivate={onSuggestionActivate.fn}
        onSuggestionSelection={onSuggestionSelection.fn}
        onTextInput={onTextInput.fn}
      />);
      jest.spyOn(onSuggestionSelection, 'fn');

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: true,
        metaKey: false
      };

      emptyAutoSuggestComponent.instance().onSuggestionSelection(selectedSuggestion, mockEvent);
      expect(onSuggestionSelection.fn).toHaveBeenCalledWith(selectedSuggestion, true);
    });


    it('should set "shouldopeninnewwindow" boolean false if no ctrl key is pressed', () => {
      const emptyAutoSuggestComponent = mount(<AutoSuggest
        activeSuggestion={{ index: -1 }}
        onSubmit={onSubmit.fn}
        onSuggestionActivate={onSuggestionActivate.fn}
        onSuggestionSelection={onSuggestionSelection.fn}
        onTextInput={onTextInput.fn}
      />);
      jest.spyOn(onSuggestionSelection, 'fn');

      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        ctrlKey: false,
        metaKey: false
      };

      emptyAutoSuggestComponent.instance().onSuggestionSelection(selectedSuggestion, mockEvent);
      expect(onSuggestionSelection.fn).toHaveBeenCalledWith(selectedSuggestion, false);
    });
  });

});
