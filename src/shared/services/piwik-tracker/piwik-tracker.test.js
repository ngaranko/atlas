import piwikTracker from './piwik-tracker';

describe('piwikTracker', () => {
  beforeEach(() => {
    global.window._paq = {
      push: jest.fn()
    };
  });

  it('should call window._paq.push', () => {
    piwikTracker(['test'], 'foo', 'string');

    expect(global.window._paq.push).toHaveBeenCalledWith(['test']);
    expect(global.window._paq.push).toHaveBeenCalledWith('foo');
    expect(global.window._paq.push).toHaveBeenCalledWith('string');
  });

  it('should saet customDimensions', () => {
    piwikTracker(['test'], 'foo', 'string', [{ id: 1, value: 'test' }]);

    expect(global.window._paq.push).toHaveBeenCalledWith(['setCustomDimension', 1, 'test']);
  });

  it('should not call window._paq.push without data', () => {
    piwikTracker([], '', '');

    expect(global.window._paq.push).not.toHaveBeenCalled();
  });
});
