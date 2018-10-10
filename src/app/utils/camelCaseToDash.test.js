import camelCaseToDash from './camelCaseToDash';

describe('camelcase to dash', () => {
  it('should convert camelCase', () => {
    expect(camelCaseToDash('foo')).toBe('foo');
    expect(camelCaseToDash('fooBar')).toBe('foo-bar');
  });
});
