import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import SpecialsPage from './SpecialsPage'
import useDataFetching from '../../utils/useDataFetching';

jest.mock('../../utils/useDataFetching')

describe('SpecialsPage', () => {  
  const specialsId = 6

  it('should render the spinner when the request is loading', () => {    
    useDataFetching.mockImplementation(() => ({
      loading: true
    }))

    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const spinner = component.find('Spinner').at(0)
    expect(spinner.exists()).toBeTruthy()
  })


  it('should render the iframe when there are results', () => {
    useDataFetching.mockImplementation(() => ({
      results: {
        data: [
          {
            attributes: {
              title: "This is a title",
              field_iframe_link: {
                uri: "http://this.is.alink"
              }
            }
          }
        ]
      }
    }))
    
    const store = configureMockStore()({ location: { payload: { id: specialsId } } })
    const component = shallow(<SpecialsPage />, { context: { store } }).dive()

    const iframe = component.find('iframe').at(0)
    expect(iframe.exists()).toBeTruthy()
  })
})
