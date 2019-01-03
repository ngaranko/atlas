import isDefined from './is-defined';

describe('is defined', () => {
  it('should be true for object', () => {
    expect(isDefined({ foo: 'bar' })).toBe(true);
  });
  it('should be true for null', () => {
    expect(isDefined(null)).toBe(true);
  });
  it('should be true for integer', () => {
    expect(isDefined(5)).toBe(true);
  });
  it('should be false for undefined', () => {
    expect(isDefined(undefined)).toBe(false);
  });
});

