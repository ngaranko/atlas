import isObject from './is-object';

describe('is object', () => {
  it('should be true for object', () => {
    expect(isObject({ foo: 'bar' })).toBe(true);
  });
  it('should be false for null', () => {
    expect(isObject(null)).toBe(false);
  });
  it('should be false for integer', () => {
    expect(isObject(5)).toBe(false);
  });
});

