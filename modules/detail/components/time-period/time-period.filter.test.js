describe('The time-period filter', function() {
  let timePeriodFilter

  beforeEach(function() {
    angular.mock.module('dpDataSelection')

    angular.mock.inject(function($filter) {
      timePeriodFilter = $filter('timePeriod')
    })
  })

  it('expects an object with two dates as input', function() {
    expect(timePeriodFilter()).toBeUndefined()
  })

  it('shows the time period when the time period is provided', function() {
    // local: 4 November 2016 tot 10 December 2017
    // jenkis: November 4, 2016 tot December 10, 2017
    expect(
      timePeriodFilter({
        'time:hasBeginning': '2016-11-04T12:00:00',
        'time:hasEnd': '2017-12-10T12:00:00',
      }),
    ).toMatch(
      /^(4 november 2016 tot 10 december 2017|november 4, 2016 tot december 10, 2017)$/i,
    )
  })

  it('shows the time period when start time period is provided', function() {
    // local: 4 November 2016
    // jenkis: November 4, 2016
    expect(
      timePeriodFilter({
        'time:hasBeginning': '2016-11-04T12:00:00',
      }),
    ).toMatch(/^(4 november 2016|november 4, 2016) $/i)
  })

  it('shows the time period when end time period is provided', function() {
    // local: tot 10 december 2017
    // jenkis: tot December 10, 2017
    expect(
      timePeriodFilter({
        'time:hasEnd': '2017-12-10T12:00:00',
      }),
    ).toMatch(/^(tot 10 december 2017|tot december 10, 2017)$/i)
  })

  it('shows an empty string when the time period when the time period is not provided', function() {
    expect(timePeriodFilter({})).toBe('')
  })
})
