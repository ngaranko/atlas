import piwikTracker from './piwik-tracker';

describe('piwikTracker', () => {
  beforeEach(() => {
    global.window._paq = {
      push: jest.fn()
    };
  });

  it('should call window._paq.push', () => {
    piwikTracker({});

    expect(global.window._paq.push).toHaveBeenCalledWith({});
  });
});
