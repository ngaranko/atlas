import React from 'react'
import { shallow /* mount */ } from 'enzyme'
// import { ThemeProvider } from '@datapunt/asc-ui'
import EditorialOverviewPage from './EditorialOverviewPage'
import useFromCMS from '../../utils/useFromCMS'
import linkAttributesFromAction from '../../../shared/services/link-attributes-from-action/linkAttributesFromAction'

import Footer from '../../components/Footer/Footer'

jest.mock('../../utils/useFromCMS')
jest.mock('../../components/Footer/Footer')
jest.mock('../../../shared/services/link-attributes-from-action/linkAttributesFromAction')

describe('EditorialOverviewPage', () => {
  // const fetchDataMock = jest.fn()

  beforeEach(() => {
    Footer.mockImplementation(() => <></>)
    linkAttributesFromAction.mockImplementation(() => ({ href: 'http://this.is.a/link' }))
  })

  it('should render the spinner when the request is loading', () => {
    useFromCMS.mockImplementation(() => ({
      loading: true,
    }))

    const component = shallow(<EditorialOverviewPage type="ARTICLES" />)

    expect(component.find('LoadingIndicator').exists()).toBeTruthy()
  })

  // it('should call the fetchData function', () => {
  //   useFromCMS.mockImplementation(() => ({
  //     loading: false,
  //     fetchData: fetchDataMock,
  //   }))

  //   const component = mount(
  //     <ThemeProvider>
  //       <EditorialOverviewPage type="ARTICLES" />
  //     </ThemeProvider>,
  //   )

  //   expect(fetchDataMock).toHaveBeenCalled()

  //   expect(component.find('Heading').props().children).toBe('Artikelen')
  // })
})
