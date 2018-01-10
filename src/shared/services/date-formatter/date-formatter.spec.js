import formatDate from './date-formatter';

describe('The date formatter service', () => {
  it('turns a date instance into a date string', () => {
    expect(formatDate(new Date('2020-12-01')))
      .toEqual('2020 M12 1');
  });

  it('uses the Dutch locale', () => {
    const date = { toLocaleDateString: jest.fn() };
    formatDate(date);
    expect(date.toLocaleDateString).toHaveBeenCalledWith('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });
});
