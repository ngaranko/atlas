import getImageFromCms from './getImageFromCms'

describe('getImageFromCms', () => {
  it('should return an url with the correct extension', () => {
    expect(getImageFromCms('myimage.PNG', 10, 10)).toContain('.PNG')
  })

  it('should return undefined when src is not a string', () => {
    expect(getImageFromCms({ foo: 'not a string ' }, 10, 10)).toBe(undefined)
  })
})
