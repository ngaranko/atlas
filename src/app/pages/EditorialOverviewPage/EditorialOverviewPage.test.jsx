import React from 'react'
import { shallow, mount } from 'enzyme'
import { ThemeProvider } from '@datapunt/asc-ui'
import EditorialOverviewPage from './EditorialOverviewPage'
import useFromCMS from '../../utils/useFromCMS'

import Footer from '../../components/Footer/Footer'

jest.mock('../../utils/useFromCMS')
jest.mock('../../components/Footer/Footer')

describe('EditorialOverviewPage', () => {
  const fetchDataMock = jest.fn()

  beforeEach(() => {
    Footer.mockImplementation(() => <></>)
  })

  it('should render the spinner when the request is loading', () => {
    useFromCMS.mockImplementation(() => ({
      loading: true,
    }))

    const component = shallow(<EditorialOverviewPage type="ARTICLES" />)

    expect(component.find('LoadingIndicator').exists()).toBeTruthy()
  })

  it('should call the fetchData function', () => {
    useFromCMS.mockImplementation(() => ({
      loading: false,
      fetchData: fetchDataMock,
    }))

    const component = mount(
      <ThemeProvider>
        <EditorialOverviewPage type="ARTICLES" />
      </ThemeProvider>,
    )

    expect(fetchDataMock).toHaveBeenCalled()

    expect(component.find('Heading').props().children).toBe('Artikelen')
  })
})
