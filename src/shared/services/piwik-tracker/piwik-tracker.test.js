import piwikTracker, { trackPageNavigation } from './piwik-tracker';

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

  describe('trackPageNavigation', () => {
    it('should call piwikTracker 3 times', () => {
      trackPageNavigation();
      expect(global.window._paq.push).toHaveBeenLastCalledWith(['trackPageView']);
    });
  });
});

