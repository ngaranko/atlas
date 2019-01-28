import dateFormatter from './date-formatter';

describe('The date formatter', () => {
  it('can format dates link', () => {
    expect(dateFormatter.tickFormatter(new Date(2016, 0, 1))).toBe('2016');
    expect(dateFormatter.tickFormatter(new Date(2016, 1, 1))).toBe('feb');
    expect(dateFormatter.tickFormatter(new Date(2016, 2, 1))).toBe('mrt');
    expect(dateFormatter.tickFormatter(new Date(2016, 10, 1))).toBe('nov');
    expect(dateFormatter.tickFormatter(new Date(2016, 11, 1))).toBe('dec');
    expect(dateFormatter.tickFormatter(new Date(2017, 0, 1))).toBe('2017');
  });
});
