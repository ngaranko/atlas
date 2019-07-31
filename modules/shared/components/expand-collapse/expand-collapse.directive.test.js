describe('`dpExpandCollapse` directive', () => {
  const FLUSH_PERIOD = 1
  let $compile
  let $rootScope
  let $interval
  let content = 'Lorem ipsum dolor sit amet.\n'

  beforeEach(angular.mock.module('dpShared'))

  beforeEach(
    angular.mock.inject((_$compile_, _$rootScope_, _$interval_) => {
      $compile = _$compile_
      $rootScope = _$rootScope_
      $interval = _$interval_
    }),
  )

  it('Should collapse and expand too lengthy content', () => {
    for (let i = 0; i <= 5; i++) {
      content += content
    }

    const collapsedElement = $compile(`<p dp-expand-collapse>${content}</p>`)($rootScope)

    collapsedElement.css({
      'max-height': '50px',
      overflow: 'hidden',
    })

    angular
      .element(document)
      .find('body')
      .append(collapsedElement)

    $interval.flush(FLUSH_PERIOD)

    const button = angular
      .element(document)
      .find('body')
      .find('button')

    expect(button).not.toBeUndefined()
    expect(collapsedElement.scope().collapsed).toBeTruthy()
    expect(collapsedElement).toHaveClass('c-show-more__container')
    expect(collapsedElement).toHaveClass('c-show-more__container--collapsed')

    button.click()

    expect(collapsedElement.scope().collapsed).toBeFalsy()
    expect(collapsedElement).toHaveClass('c-show-more__container')
    expect(collapsedElement).not.toHaveClass('c-show-more__container--collapsed')

    button.click()

    expect(collapsedElement.scope().collapsed).toBeTruthy()
    expect(collapsedElement).toHaveClass('c-show-more__container')
    expect(collapsedElement).toHaveClass('c-show-more__container--collapsed')
  })

  it('Should leave non-lengthy content', () => {
    const untouchedElement = $compile(`<p dp-expand-collapse>${content}</p>`)($rootScope)

    angular
      .element(document)
      .find('body')
      .append(untouchedElement)

    $interval.flush(FLUSH_PERIOD)

    expect(untouchedElement.scope().collapsed).toBeUndefined()
    expect(untouchedElement).not.toHaveClass('c-show-more__container')
    expect(untouchedElement).not.toHaveClass('c-show-more__container--collapsed')
  })
})
