import formatDate from './date-formatter';

describe('The date formatter service', () => {
  it('turns a date instance into a date string', () => {
    const date = { toLocaleDateString: jest.fn() };
    date.toLocaleDateString.mockReturnValue('1 december 2020');
    expect(formatDate(date)).toEqual('1 december 2020');
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
